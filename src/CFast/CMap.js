/**
 * @description Cesium初始化封装
 * @see https://cesium.com/learn/cesiumjs/ref-doc/Viewer.html#.ConstructorOptions
 * @example
 * const map = new Map('cesiumContainer', {
      handKeyEvent: true,
      onMouseMove: (position) => {
          console.log('当前坐标:', position);
      }
    });
   map.destroy();
 */
import {
  CesiumWidget
} from "@cesium/engine";
import * as Cesium from "cesium";

export default class CMap {
  constructor(cesiumContainer, viewOptions = {}) {
    // 基本属性
    this.longitude = null;
    this.latitude = null;
    this.height = null;
    this.positionDesc = null;

    // Cesium 相关实例
    this._cesiumContainer = null;
    this.viewer = null;
    this._mouseMoveHandler = null;
    this._options = {};

    // 事件绑定
    this._boundKeyDownHandler = this._handleKeyDown.bind(this);

    // 初始化
    this.initViewer(cesiumContainer, viewOptions);
  }

  /**
   * 初始化 Viewer
   * @param {String|HTMLElement} cesiumContainer 容器ID或元素
   * @param {Object} viewOptions 配置选项
   * @param {Boolean} [viewOptions.handKeyEvent=true] 是否启用快捷键
   */
  initViewer(cesiumContainer, viewOptions) {
    // 获取容器元素
    this._cesiumContainer = typeof cesiumContainer === "string" ?
      document.getElementById(cesiumContainer) :
      cesiumContainer;

    if (!this._cesiumContainer) {
      throw new Error('Cesium container element not found.');
    }

    // 合并配置
    this._options = {
      ...viewOptions
    };
    this.handKeyEvent = this._options.handKeyEvent;

    // 初始化Cesium
    this._initCesium();

    // 绑定事件
    if (this.handKeyEvent) {
      document.addEventListener('keydown', this._boundKeyDownHandler);
    }
  }

  /**
   * 初始化Cesium Viewer
   */
  _initCesium() {
    try {
      if (this.viewer) return;

      // 环境判断
      const mode =
        import.meta.env.MODE || 'production';
      const isDev = mode === 'development';

      // 创建影像提供者
      const imageryProvider = isDev ?
        this._createGeovisImageryProvider() :
        this._createTiandituProvider();

      // 合并配置选项 

      const defaultOptions = {
        fullscreenButton: false,
        homeButton: false,
        animation: true,
        baseLayerPicker: false,
        geocoder: false,
        timeline: true,
        sceneModePicker: false,
        navigationHelpButton: false,
        infoBox: false,
        terrainExaggeration: 1,
        skyBox: this._createSkyBox(),
        imageryProvider: imageryProvider,
        contextOptions: {
          requestWebgl2: true
        },
        creditContainer: "creditContainer"
      };

      // 创建Viewer
      this.viewer = new CesiumWidget(this._cesiumContainer, {
        ...defaultOptions,
        ...this._options
      });

      // 添加额外图层
      this._initImageryLayers();

      // 初始化鼠标移动事件
      this._initMouseMoveHandler();

    } catch (error) {
      console.error('Cesium initialization failed:', error);
      throw error;
    }
  }

  /**
   * 创建天空盒
   */
  _createSkyBox() {
    return new Cesium.SkyBox({
      sources: {
        positiveX: './source/skybox_yz/px.png',
        negativeX: './source/skybox_yz/nx.png',
        positiveY: './source/skybox_yz/ny.png',
        negativeY: './source/skybox_yz/py.png',
        positiveZ: './source/skybox_yz/pz.png',
        negativeZ: './source/skybox_yz/nz.png'
      }
    });
  }

  /**
   * 创建GeoVis影像提供者（开发环境）
   */
  _createGeovisImageryProvider() {
    return new Cesium.UrlTemplateImageryProvider({
      url: `https://tiles{s}.geovisearth.com/base/v1/img/{z}/{x}/{y}?format=webp&token=2e47a66d8ddd4d24f4aaa4afc6f41b181b85486202eca073a3f760d5db76e5ad`,
      subdomains: '123'
    });
  }

  /**
   * 创建天地图提供者（生产环境）
   */
  _createTiandituProvider() {
    return imageryProviders.tiandituImgProvider;
  }

  /**
   * 初始化额外图层
   */
  _initImageryLayers() {
    const mode =
      import.meta.env.MODE || 'production';
    if (mode === 'development') {
      const ciaLayer = new Cesium.UrlTemplateImageryProvider({
        url: `https://tiles{s}.geovisearth.com/base/v1/cia/{z}/{x}/{y}?format=png&token=2e47a66d8ddd4d24f4aaa4afc6f41b181b85486202eca073a3f760d5db76e5ad`,
        subdomains: '123'
      });
      this.viewer.imageryLayers.addImageryProvider(ciaLayer);
    } else {
      this.viewer.imageryLayers.addImageryProvider(imageryProviders.tiandituTerraImgProvider);
    }
  }

  /**
   * 初始化鼠标移动事件
   */
  _initMouseMoveHandler() {
    this._mouseMoveHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this._mouseMoveHandler.setInputAction(movement => {
      this._handleMouseMove(movement);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  /**
   * 处理鼠标移动事件
   */
  _handleMouseMove(movement) {
    const position = this._getMousePosition(movement.endPosition);
    if (position) {
      this.positionDesc = `经度:${position.longitude}, 纬度:${position.latitude}`;
      if (this._options.onMouseMove) {
        this._options.onMouseMove(position);
      }
    }
  }

  /**
   * 获取鼠标位置地理坐标
   */
  _getMousePosition(cartesian2) {
    const ellipsoid = this.viewer.scene.globe.ellipsoid;
    const cartesian = this.viewer.camera.pickEllipsoid(cartesian2, ellipsoid);

    if (!cartesian) return null;

    const cartographic = ellipsoid.cartesianToCartographic(cartesian);
    return {
      longitude: this._convertToDegrees(cartographic.longitude),
      latitude: this._convertToDegrees(cartographic.latitude),
      height: Math.ceil(this.viewer.camera.positionCartographic.height)
    };
  }

  /**
   * 弧度转度
   */
  _convertToDegrees(radians) {
    return parseFloat(Cesium.Math.toDegrees(radians).toFixed(6));
  }

  /**
   * 处理键盘事件
   */
  _handleKeyDown(event) {
    if (!this._cesiumContainer.contains(event.target)) return;

    switch (event.keyCode) {
      case 32: // 空格键
        this._focusView();
        event.preventDefault();
        break;
      case 82: // R键
        this._toggleWireframe();
        break;
      case 70: // F键
        this._toggleFPS();
        break;
    }
  }

  /**
   * 俯视当前视图
   */
  _focusView() {
    const center = this.getCenter();
    if (!center) return;

    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        center.longitude,
        center.latitude,
        center.height + 1000
      ),
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-90),
        roll: 0
      }
    });
  }

  /**
   * 切换三角网显示
   */
  _toggleWireframe() {
    if (this.viewer.cesiumInspector) {
      const vm = this.viewer.cesiumInspector.viewModel;
      vm.wireframe = !vm.wireframe;
    }
  }

  /**
   * 切换FPS显示
   */
  _toggleFPS() {
    this.viewer.scene.debugShowFramesPerSecond = !this.viewer.scene.debugShowFramesPerSecond;
  }

  /**
   * 获取当前视图中心
   */
  getCenter() {
    const scene = this.viewer.scene;
    const ellipsoid = scene.globe.ellipsoid;
    const canvas = scene.canvas;

    const cartesian = this.viewer.camera.pickEllipsoid(
      new Cesium.Cartesian2(canvas.width / 2, canvas.height / 2),
      ellipsoid
    );

    if (!cartesian) return null;

    const cartographic = ellipsoid.cartesianToCartographic(cartesian);
    return {
      longitude: this._convertToDegrees(cartographic.longitude),
      latitude: this._convertToDegrees(cartographic.latitude),
      height: this.viewer.camera.positionCartographic.height
    };
  }

  /**
   * 销毁实例
   */
  destroy() {
    if (this.viewer && !this.viewer.isDestroyed()) {
      this.viewer.destroy();
      this.viewer = null;
    }

    document.removeEventListener('keydown', this._boundKeyDownHandler);

    if (this._mouseMoveHandler) {
      this._mouseMoveHandler.destroy();
      this._mouseMoveHandler = null;
    }
  }
}
