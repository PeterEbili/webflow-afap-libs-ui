const webflow = window.webflow || [];

interface worldSettingFace {
    gravity?: string;
    timeScale?: string;
}
interface bodySettingFace {
    type?: string;
    draggable?: boolean;
    float?: boolean;
    fixed?: boolean;
    mass?: string;
    friction?: string;
    restitution?: string;
    shape?: string;
    velocityX?: string;
    velocityY?: string;
    radius?: string;
}

export class MotionableWfApp {
    private readonly attr: string;
    private readonly appAttr: string;
    private readonly selector;
    private readonly container: divType;
    private readonly gravity: inputType;
    private readonly timeScale: inputType;
    private readonly worldApplyButton: btnType;
    private readonly worldRemoveButton: btnType;
    private readonly worldResetButton: btnType;
    private readonly mass: inputType;
    private readonly bodyType: selectType;
    private readonly drag: inputType;
    private readonly float: inputType;
    private readonly fixed: inputType;
    private readonly shape: selectType;
    private readonly friction: inputType;
    private readonly restitution: inputType;
    private readonly radius: inputType;
    private readonly velocityX: inputType;
    private readonly velocityY: inputType;
    private readonly bodyApplyButton: btnType;
    private readonly bodyRemoveButton: btnType;
    private readonly bodyResetButton: btnType;
    private worldSetting: worldSettingFace;
    private bodySetting: bodySettingFace;
    private readonly bodyTypeList: string[];
    private readonly bodyShapeList: string[];
    constructor() {
        this.attr = 'af-motion';
        this.appAttr = `${this.attr}-app`;
        this.selector = {
            app: {
                container: `[${this.appAttr}="container"]`,
                world: {
                    gravity: `[${this.appAttr}="gravity"]`,
                    timeScale: `[${this.appAttr}="time-scale"]`,
                    removeBtn: `[${this.appAttr}="world-remove"]`,
                    resetBtn: `[${this.appAttr}="world-reset"]`,
                    applyBtn: `[${this.appAttr}="world-apply"]`,
                },
                body: {
                    mass: `[${this.appAttr}="mass"]`,
                    type: `[${this.appAttr}="type"]`,
                    drag: `[${this.appAttr}="drag"]`,
                    float: `[${this.appAttr}="float"]`,
                    fixed: `[${this.appAttr}="fixed"]`,
                    shape: `[${this.appAttr}="shape"]`,
                    friction: `[${this.appAttr}="friction"]`,
                    restitution: `[${this.appAttr}="restitution"]`,
                    radius: `[${this.appAttr}="radius"]`,
                    velocityX: `[${this.appAttr}="velocity-x"]`,
                    velocityY: `[${this.appAttr}="velocity-y"]`,
                    removeBtn: `[${this.appAttr}="body-remove"]`,
                    resetBtn: `[${this.appAttr}="body-reset"]`,
                    applyBtn: `[${this.appAttr}="body-apply"]`,
                },
            },
            prop: {
                world: {
                    gravity: `${this.attr}-gravity`,
                    timeScale: `${this.attr}-timeScale`,
                },
                body: {
                    type: `${this.attr}-type`,
                    drag: `${this.attr}-draggable`,
                    float: `${this.attr}-float`,
                    fixed: `${this.attr}-fixed`,
                    mass: `${this.attr}-mass`,
                    friction: `${this.attr}-friction`,
                    restitution: `${this.attr}-restitution`,
                    shape: `${this.attr}-shape`,
                    velocityX: `${this.attr}-velocityX`,
                    velocityY: `${this.attr}-velocityY`,
                    radius: `${this.attr}-radius`,
                },
            },
        };
        this.bodyShapeList = ['rectangle', 'circle'];
        this.bodyTypeList = ['rigid', 'fluid', 'ghost', 'soft'];
        this.worldSetting = {};
        this.bodySetting = {};
        this.container = <divType>document.querySelector(this.selector.app.container);
        // world
        this.gravity = document.querySelector(this.selector.app.world.gravity)!;
        this.timeScale = document.querySelector(this.selector.app.world.timeScale)!;
        this.worldApplyButton = document.querySelector(this.selector.app.world.applyBtn)!;
        this.worldRemoveButton = document.querySelector(this.selector.app.world.removeBtn)!;
        this.worldResetButton = document.querySelector(this.selector.app.world.resetBtn)!;
        // body
        this.mass = document.querySelector(this.selector.app.body.mass)!;
        this.bodyType = document.querySelector(this.selector.app.body.type)!;
        this.shape = document.querySelector(this.selector.app.body.shape)!;
        this.float = document.querySelector(this.selector.app.body.float)!;
        this.fixed = document.querySelector(this.selector.app.body.fixed)!;
        this.drag = document.querySelector(this.selector.app.body.drag)!;
        this.friction = document.querySelector(this.selector.app.body.friction)!;
        this.radius = document.querySelector(this.selector.app.body.radius)!;
        this.restitution = document.querySelector(this.selector.app.body.restitution)!;
        this.velocityX = document.querySelector(this.selector.app.body.velocityX)!;
        this.velocityY = document.querySelector(this.selector.app.body.velocityY)!;
        this.bodyApplyButton = document.querySelector(this.selector.app.body.applyBtn)!;
        this.bodyRemoveButton = document.querySelector(this.selector.app.body.removeBtn)!;
        this.bodyResetButton = document.querySelector(this.selector.app.body.resetBtn)!;
        this.resetWorld();
        this.resetBody();
        this.listener();
    }

    private listener() {
        // world
        this.gravity?.addEventListener('input', () => {
            this.worldSetting.gravity = this.gravity.value;
        });
        this.timeScale?.addEventListener('input', () => {
            this.worldSetting.timeScale = this.timeScale.value;
        });
        this.worldApplyButton?.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { gravity, timeScale } = this.worldSetting;
            const { world } = this.selector.prop;
            // set
            await swe.setCustomAttribute(this.attr, 'world');
            gravity ? await swe.setCustomAttribute(world.gravity, gravity) : null;
            timeScale ? await swe.setCustomAttribute(world.timeScale, timeScale) : undefined;
            // button text flip
            this.btnTextFlip(this.worldApplyButton, 'Applied!!!');
        });
        this.worldRemoveButton?.addEventListener('click', async () => {
            // remove the trigger id from the webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element.');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { world } = this.selector.prop;
            // remove
            await swe.removeCustomAttribute(this.attr);
            await swe.removeCustomAttribute(world.gravity);
            await swe.removeCustomAttribute(world.timeScale);
            // button text flip
            this.btnTextFlip(this.worldRemoveButton, 'Removed!!!');
        });
        this.worldResetButton?.addEventListener('click', this.resetWorld);

        // body
        this.float?.addEventListener('change', () => {
            this.bodySetting.float = this.float.checked;
        });
        this.drag?.addEventListener('change', () => {
            this.bodySetting.draggable = this.drag.checked;
        });
        this.fixed?.addEventListener('change', () => {
            this.bodySetting.fixed = this.fixed.checked;
        });
        this.bodyType?.addEventListener('change', () => {
            this.bodySetting.type = this.bodyType.value;
        });
        this.shape?.addEventListener('change', () => {
            this.bodySetting.shape = this.shape.value;
        });
        this.mass?.addEventListener('input', () => {
            this.bodySetting.mass = this.mass.value;
        });
        this.friction?.addEventListener('input', () => {
            this.bodySetting.friction = this.friction.value;
        });
        this.restitution?.addEventListener('input', () => {
            this.bodySetting.restitution = this.restitution.value;
        });
        this.velocityX?.addEventListener('input', () => {
            this.bodySetting.velocityX = this.velocityX.value;
        });
        this.velocityY?.addEventListener('input', () => {
            this.bodySetting.velocityY = this.velocityY.value;
        });
        this.radius?.addEventListener('input', () => {
            this.bodySetting.radius = this.radius.value;
        });
        this.bodyApplyButton?.addEventListener('click', async () => {
            // apply to webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { type, shape, draggable, fixed, float, mass, radius, restitution, friction, velocityX, velocityY } =
                this.bodySetting;
            const { body } = this.selector.prop;
            // set
            await swe.setCustomAttribute(this.attr, 'body');
            await swe.setCustomAttribute(body.type, type!);
            await swe.setCustomAttribute(body.shape, shape!);
            await swe.setCustomAttribute(body.drag, String(draggable));
            await swe.setCustomAttribute(body.fixed, String(fixed));
            await swe.setCustomAttribute(body.float, String(float));
            mass ? await swe.setCustomAttribute(body.mass, mass!) : undefined;
            radius ? await swe.setCustomAttribute(body.radius, radius!) : undefined;
            restitution ? await swe.setCustomAttribute(body.restitution, restitution!) : undefined;
            friction ? await swe.setCustomAttribute(body.friction, friction!) : undefined;
            velocityX ? await swe.setCustomAttribute(body.velocityX, velocityX!) : undefined;
            velocityY ? await swe.setCustomAttribute(body.velocityY, velocityY!) : undefined;
            // button text flip
            this.btnTextFlip(this.bodyApplyButton, 'Applied!!!');
        });
        this.bodyRemoveButton?.addEventListener('click', async () => {
            // apply on webflow element
            const swe = await webflow?.getSelectedElement(); // Get Selected Element
            if (!swe) return alert('Select an element');
            if (!swe?.customAttributes) return alert(`Selected element doesn't allow custom attribute.`);
            const { body } = this.selector.prop;
            // remove
            await swe.removeCustomAttribute(this.attr);
            await swe.removeCustomAttribute(body.type);
            await swe.removeCustomAttribute(body.shape);
            await swe.removeCustomAttribute(body.drag);
            await swe.removeCustomAttribute(body.fixed);
            await swe.removeCustomAttribute(body.float);
            await swe.removeCustomAttribute(body.mass);
            await swe.removeCustomAttribute(body.radius);
            await swe.removeCustomAttribute(body.restitution);
            await swe.removeCustomAttribute(body.friction);
            await swe.removeCustomAttribute(body.velocityX);
            await swe.removeCustomAttribute(body.velocityY);
            // button text flip
            this.btnTextFlip(this.bodyRemoveButton, 'Removed!!!');
        });
        this.bodyResetButton?.addEventListener('click', this.resetBody);
    }

    btnTextFlip = (btn: btnType, text: string, duration: number = 2000) => {
        const originalText = btn.textContent;
        btn.textContent = text;
        setTimeout(() => {
            btn.textContent = originalText;
        }, duration);
    };

    private loadOnSelectElement(element: selectType, list: string[]) {
        list.forEach((t, index) => {
            const option = document.createElement('option');
            option.value = t;
            option.text = t;
            if (!index) {
                option.defaultSelected = true;
            }
            // add to type Selection
            element.add(option);
        });
    }

    private resetWorld = () => {
        // default current option setting
        this.worldSetting = {
            gravity: '-9.8',
            timeScale: '1',
        };

        // gravit
        this.gravity.value = this.worldSetting.gravity!;
        // time scale
        this.timeScale.value = this.worldSetting.timeScale!;
    };

    private resetBody = () => {
        // default current option setting
        this.bodySetting = {
            type: 'rigid',
            shape: 'rectangle',
            draggable: true,
            float: false,
            fixed: false,
            friction: '0.05',
            restitution: '0.5',
            mass: '1',
            velocityX: '0.3',
            velocityY: '0.4',
        };
        // load body types
        [...this.bodyType.children].forEach((e) => e.remove());
        this.loadOnSelectElement(this.bodyType, this.bodyTypeList);
        // load body shape
        [...this.shape.children].forEach((e) => e.remove());
        this.loadOnSelectElement(this.shape, this.bodyShapeList);
        //float
        this.float.checked = this.bodySetting.float!;
        // fixed
        this.fixed.checked = this.bodySetting.fixed!;
        // draggable
        this.drag.checked = this.bodySetting.draggable!;
        // mass
        this.mass.value = this.bodySetting.mass!;
        // friction
        this.friction.value = this.bodySetting.friction!;
        // restitution
        this.restitution.value = this.bodySetting.restitution!;
        // velocityX
        this.velocityX.value = this.bodySetting.velocityX!;
        // velocityY
        this.velocityY.value = this.bodySetting.velocityY!;
    };
}
