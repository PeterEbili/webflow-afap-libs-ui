export class PatternableWfApp {
    private readonly selector;
    private readonly sampleAttr;
    private readonly animAttr;
    private readonly attr;
    private readonly container: divType;
    private readonly switchCheckInput: divType; // enable and disable patternable section
    private readonly list: divType;
    private readonly cloneItem: divType;
    private readonly importBtn: btnType;
    private readonly exportBtn: btnType;
    private readonly resetBtn: btnType;
    private readonly uploadBtn: btnType;
    // console elements
    private readonly consoleBody: divType;
    private readonly consoleClose: btnType;
    private readonly consoleTextarea: HTMLTextAreaElement;
    /**
     * Current settings for the patternable section
     */
    public current: Array<CurrentSettingFace> = [];
    private readonly app: AppUI;
    constructor(app: AppUI) {
        // Initialize the app UI
        this.app = app;
        // Define attributes for patternable elements
        this.sampleAttr = `anim-sample`;
        this.animAttr = `af-anims`;
        this.attr = `anim-app`;
        const ptn = 'pattern';
        this.selector = {
            app: {
                container: `[${this.attr}="${ptn}-container"]`,
                list: `[${this.attr}="${ptn}-list"]`,
                item: `[${this.attr}="${ptn}-item"]`,
                itemId: `${ptn}-item-id`,
                itemName: `[${this.attr}="${ptn}-item-name"]`,
                itemEdit: `[${this.attr}="${ptn}-item-edit"]`,
                itemDelete: `[${this.attr}="${ptn}-item-del"]`,
                // command button
                import: `[${this.attr}="${ptn}-import"]`,
                export: `[${this.attr}="${ptn}-export"]`,
                reset: `[${this.attr}="${ptn}-reset"]`,
                upload: `[${this.attr}="${ptn}-upload"]`,
                // switch
                switch: `[${this.attr}="${ptn}-switch"]`,
                // console
                consoleBody: `[${this.attr}="${ptn}-console-body"]`,
                consoleClose: `[${this.attr}="${ptn}-console-close"]`,
                consoleTextarea: `[${this.attr}="${ptn}-console-textarea"]`,
            },
        };
        // Define types for div and button elements
        this.container = <divType>document.querySelector(this.selector.app.container);
        // Initialize the list element from container
        this.list = <divType>this.container?.querySelector(this.selector.app.list);
        // Initialize the clone item element from container
        const cloneItem = <divType>this.list?.querySelector(this.selector.app.item);
        this.cloneItem = <divType>cloneItem?.cloneNode(true);
        // clean up list
        this.list?.querySelectorAll(this.selector.app.item).forEach((item) => item.remove());
        // Initialize the switch element from container
        this.switchCheckInput = <inputType>document.querySelector(this.selector.app.switch);
        // initialize command buttons
        this.importBtn = <btnType>document.querySelector(this.selector.app.import);
        this.exportBtn = <btnType>this.container?.querySelector(this.selector.app.export);
        this.resetBtn = <btnType>this.container?.querySelector(this.selector.app.reset);
        this.uploadBtn = <btnType>this.container?.querySelector(this.selector.app.upload);
        // Initialize the console elements
        this.consoleBody = <divType>document.querySelector(this.selector.app.consoleBody);
        this.consoleClose = <btnType>document.querySelector(this.selector.app.consoleClose);
        this.consoleTextarea = <HTMLTextAreaElement>document.querySelector(this.selector.app.consoleTextarea);

        this.init();
    }

    private init() {
        if (!this.container) {
            console.warn('Patternable container not found');
            return;
        }
        this.container.style.setProperty('display', 'none', 'important');
        this.importBtn?.style.setProperty('display', 'none', 'important');

        //switch check input for enabling/disabling patternable section
        this.switchCheckInput?.addEventListener('change', (event) => {
            const isChecked = (event.target as HTMLInputElement).checked;
            isChecked
                ? this.container.style.removeProperty('display')
                : this.container.style.setProperty('display', 'none', 'important');
            // show or hide import button
            isChecked
                ? this.importBtn.style.removeProperty('display')
                : this.importBtn.style.setProperty('display', 'none', 'important');
        });

        // console close button event listener
        this.consoleClose?.addEventListener('click', () => {
            // close the console body
            this.consoleBody.classList.remove('active');
            // clear the console textarea
            this.consoleTextarea.value = '';
        });

        // Import button event listener
        this.importBtn?.addEventListener('click', () => {
            // clone the item template
            const item = <divType>this.cloneItem.cloneNode(true);
            // Append the cloned item to the list
            this.list?.appendChild(item);
            // Generate a unique ID for the item
            const id = this.app.current.id?.trim().replaceAll(' ', '') || this.generateItemId();
            let itemId = id;
            // check if the ID already exists
            if (this.current.some((pattern) => pattern.id === id)) {
                itemId = this.generateItemId();
            }

            //const itemId = this.app.current.id || this.generateItemId();
            // Add the current pattern in app to the current patterns
            const currentPattern: CurrentSettingFace = {
                id: itemId,
                ...JSON.parse(JSON.stringify(this.app.current)), // deep copy of the current app settings
                //...this.app.current,
            };
            this.current.push(currentPattern);
            // Set the item ID
            item.setAttribute(this.selector.app.itemId, itemId);

            // Set the item name
            const itemName = <inputType>item.querySelector(this.selector.app.itemName);
            itemName.value = itemId;

            // Set the item edit button
            const itemEdit = <btnType>item.querySelector(this.selector.app.itemEdit);
            itemEdit.addEventListener('click', () => {
                //
            });

            // Set the item delete button
            const itemDelete = <btnType>item.querySelector(this.selector.app.itemDelete);
            itemDelete.addEventListener('click', () => {
                // Confirm deletion
                if (!confirm(`Are you sure you want to delete the ${itemId} pattern?`)) {
                    return;
                }
                // Remove the item from the list
                item.remove();
                // Remove the item from the current patterns
                this.current = this.current.filter((pattern) => pattern.id !== itemId);
            });
        });
        // Export button event listener
        this.exportBtn?.addEventListener('click', () => {
            // open the console body
            this.consoleBody.classList.add('active');
            // Clear the console textarea
            this.consoleTextarea.value = '';
            //console.log(this.current);
            //this.consoleTextarea.value = JSON.stringify(this.current, null, 4);
            this.consoleTextarea.value = AnimsStyleConverter.toFlatFormat(this.current);
        });
        // Reset button event listener
        this.resetBtn?.addEventListener('click', () => {
            // Clear the current patterns
            this.current = [];
            // Clear the list
            this.list?.querySelectorAll(this.selector.app.item).forEach((item) => item.remove());
            // Reset the console textarea
            this.consoleTextarea.value = '';
            // Hide the console body
            this.consoleClose?.click();
        });
        // Upload button event listener
        this.uploadBtn?.addEventListener('click', () => {
            //
        });
    }

    private generateItemId(): string {
        const id = Math.floor((Date.now() - Math.floor(Math.random() * 10000)) / Math.floor(Math.random() * 10000000));
        return `af${id}`.replace(/-/g, '');
    }
}

export class AnimsStyleConverter {
    static toFlatFormat(data: CurrentSettingFace[]): string {
        const newData = data
            .map((item) => {
                const { id, type, event, options, animType, trigger, screenpos } = item;

                const { delay, duration, easing, from, to, reversed, repeatCount, loop } = options;

                const lines = [
                    `${id}{`,
                    `    type: ${type};`,
                    `    event: ${event};`,
                    `    delay: ${delay};`,
                    `    duration: ${duration};`,
                    `    easing: ${easing};`,
                ];
                reversed ? lines.push(`    reversed: ${reversed};`) : null;
                repeatCount ? lines.push(`    repeatCount: ${repeatCount};`) : null;
                loop ? lines.push(`    loop: ${loop};`) : null;
                animType ? lines.push(`    animType: ${animType};`) : null;
                trigger ? lines.push(`    trigger: "${trigger}";`) : null;
                screenpos ? lines.push(`    screenpos: ${screenpos};`) : null;

                for (const key in from) {
                    lines.push(`    from_${key}: ${from[key]};`);
                }

                for (const key in to) {
                    lines.push(`    to_${key}: ${to[key]};`);
                }

                lines.push(`}\n`);

                return lines.join('\n');
            })
            .join('\n');
        // Wrap the flat format in a style tag
        if (!newData) return '';
        return `<style af-anims-style>\n${newData}</style>`;
    }

    static fromFlatFormat(flatStr: string): CurrentSettingFace[] {
        const blocks = flatStr.match(/([a-zA-Z0-9_]+)\s*\{[^}]+\}/g);
        if (!blocks) return [];

        return blocks.map((block) => {
            const idMatch = block.match(/^([a-zA-Z0-9_]+)\s*\{/);
            const id = idMatch ? idMatch[1] : '';
            const lines = block
                .split('\n')
                .slice(1, -1)
                .map((line) => line.trim());
            const obj: CurrentSettingFace = {
                id,
                type: 'custom',
                event: 'view',
                options: {
                    delay: 0,
                    duration: 1,
                    easing: 'linear',
                    from: <SupportedCSSProperties>{},
                    to: <SupportedCSSProperties>{},
                },
                currentPropertyList: <string[]>[],
                selectedProperty: <{ [key: string]: { from: string; to: string } }>{},
            };

            for (const line of lines) {
                const [key, val] = line.split(':').map((s) => s.trim().replace(/;$/, ''));

                if (key.startsWith('from_') && obj.options.from) {
                    const prop = key.replace('from_', '');
                    obj.options.from[prop] = isNaN(Number(val)) ? val : Number(val);
                    !obj.currentPropertyList?.includes(prop) ? obj.currentPropertyList.push(prop) : null;
                    obj.selectedProperty[prop] = obj.selectedProperty[prop] || {};
                    obj.selectedProperty[prop].from = val;
                } else if (key.startsWith('to_') && obj.options.to) {
                    const prop = key.replace('to_', '');
                    obj.options.to[prop] = isNaN(Number(val)) ? val : Number(val);
                    !obj.currentPropertyList?.includes(prop) ? obj.currentPropertyList.push(prop) : null;
                    obj.selectedProperty[prop] = obj.selectedProperty[prop] || {};
                    obj.selectedProperty[prop].to = val;
                } else if (['delay', 'duration'].includes(key)) {
                    obj.options[key] = Number(val);
                } else if (['easing'].includes(key)) {
                    obj.options[key] = val;
                } else if (['type', 'event', 'animType', 'trigger', 'screenpos'].includes(key)) {
                    obj[key] = val.replace(/^"|"$/g, '');
                } else if (['loop', 'reversed'].includes(key)) {
                    obj.options[key] = Boolean(val);
                }
            }

            // Set default values for options if not provided
            obj.options.delay = obj.options.delay || 0;
            obj.options.duration = obj.options.duration || 1;
            obj.options.easing = obj.options.easing || 'linear';

            //
            if (obj.options.from && Object.keys(obj.options.from).length === 0) {
                delete obj.options.from;
            }
            if (obj.options.to && Object.keys(obj.options.to).length === 0) {
                delete obj.options.to;
            }

            return obj as CurrentSettingFace;
        });
    }
}
