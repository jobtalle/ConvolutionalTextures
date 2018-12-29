const ConvTex = function(myr, shader, width, height, quality) {
    const _surfaces = [
        new myr.Surface(width, height, quality),
        new myr.Surface(width, height, quality)
    ];

    let _front = 0;

    const flip = () => {
        _front = 1 - _front;
    };

    this.update = () => {
        _surfaces[1 - _front].bind();
        _surfaces[1 - _front].clear();

        shader.setSurface("source", _surfaces[_front]);
        myr.blendDisable();
        shader.draw(0, 0);
        myr.blendEnable();

        flip();
    };

    this.apply = applicationShader => {
        _surfaces[1 - _front].bind();
        _surfaces[1 - _front].clear();

        applicationShader.setSurface("target", _surfaces[_front]);
        myr.blendDisable();
        applicationShader.draw(0, 0);
        myr.blendEnable();

        flip();
    };

    this.getFront = () => {
        return _surfaces[_front];
    };

    this.setClearColor = color => {
        for (const surface of _surfaces)
            surface.setClearColor(color);
    };
};