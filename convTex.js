const ConvTex = function(myr, shader, width, height) {
    const _surfaces = [
        new myr.Surface(width, height),
        new myr.Surface(width, height)
    ];

    let _front = 0;

    const flip = () => {
        _front = 1 - _front;
    };

    this.update = () => {
        _surfaces[1 - _front].bind();
        _surfaces[1 - _front].clear();

        shader.setSurface("source", _surfaces[_front]);
        shader.draw(0, 0);

        flip();
    };

    this.getFront = () => {
        return _surfaces[_front];
    };
};