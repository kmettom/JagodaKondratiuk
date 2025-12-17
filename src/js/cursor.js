const $$ = (s) => Array.prototype.slice.call(document.querySelectorAll(s));
const isEl = (obj) => obj instanceof HTMLElement;
const isStr = (obj) =>
    Object.prototype.toString.call(obj) === "[object String]";

const cursorDot = ({
                       zIndex = 999,
                       diameter = 60,
                       borderWidth = 1,
                       borderColor = "#fff",
                       easing = 4,
                       background = "transparent",
                       mixBlendMode = "normal",
                       // mixBlendMode = 'exclusion',
                   } = {}) => {
    let inited = false;
    const alt = {x: 0, y: 0, o: 1, d: diameter};
    const cur = {x: 0, y: 0, o: 0, d: diameter};
    const dot = document.createElement("div");
    dot.id = "cursorElement";
    const tim = easing / 15;
    dot.style = `z-index:${zIndex};height:${diameter}px;width:${diameter}px;background:${background};border:${borderWidth}px solid ${borderColor};mix-blend-mode: ${mixBlendMode} ;transition:background ${tim}s,border ${tim}s`;

    dot.updateBgColor = (_color) => {
        borderColor = _color;
        dot.style.border = '1px solid' + _color;
    };

    dot.updateBgColor(borderColor);

    document.addEventListener("mousemove", (e) => {
        alt.x = e.clientX;
        alt.y = e.clientY;
        dot.style.opacity = 1;
        if (!inited) {
            document.body.appendChild(dot);
            // document.body.append(dot);
            cur.x = alt.x;
            cur.y = alt.y;
            inited = true;
            draw();
        }
    });

    const draw = () => {
        const dX = alt.x - cur.x;
        const dY = alt.y - cur.y;
        cur.x += dX / easing;
        cur.y += dY / easing;
        const t3d = `translate3d(${cur.x - cur.d / 2}px,${cur.y - cur.d / 2}px,0)`;
        dot.style.webkitTransform = t3d;
        dot.style.transform = t3d;

        const dO = alt.o - cur.o;
        cur.o += dO / easing;
        dot.style.opacity = cur.o;

        const dD = alt.d - cur.d;
        cur.d += dD / easing;
        dot.style.height = cur.d + "px";
        dot.style.width = cur.d + "px";

        try {
            requestAnimationFrame(draw);
        } catch (_) {
            setImmediate(draw);
        }
    };

    dot.over = (any, style) => {
        const fn = (el) => {
            const getCursorBg = () => {
                const bodyEl = document.querySelector('body');
                return bodyEl.classList.contains('ligth') ? 'rgba(1, 1, 1, 0.2)' : 'rgba(255, 255, 255, 0.3)';
            }
            el.addEventListener("mouseover", (_) => {
                const cursorBG = getCursorBg();
                console.log("cursorBG", cursorBG)
                dot.style.backgroundColor = dot.backgroundColor = cursorBG;
                // if (style.mixBlendMode) dot.style.mixBlendMode = style.mixBlendMode
                if (style.borderColor) dot.style.borderColor = style.borderColor;
                if (style.scale) alt.d = diameter * style.scale;
            });
            el.addEventListener("mouseout", (_) => {
                // dot.style.mixBlendMode = dot.mixBlendMode = mixBlendMode;
                dot.style.backgroundColor = background;
                dot.style.borderColor = dot.borderColor = borderColor;
                if (style.scale) alt.d = diameter;
            });
        };
        if (isEl(any)) fn(any);
        else if (isStr(any)) $$(any).forEach(fn);
    };

    return dot;
};

module.exports = cursorDot
