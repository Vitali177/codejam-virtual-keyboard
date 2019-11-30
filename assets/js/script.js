const KeyBoard = {

    elements: {
        input: null,
        main: null,
        keys: [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Delete', 
            'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 
            'Shift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/', 'ArrowUp', 'Shift',  
            'Control', 'Meta', 'Alt', ' ', 'Alt', 'Control', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
        ],

        keyCode: [  
            192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
            9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 46,
            20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 
            16, 191, 90, 88, 67, 86, 66, 78, 77, 188, 190, 144, 38, 16, 
            17, 91, 18, 32, 18, 17, 37, 40, 39
        ],
        keyElements: []
    },

    properties: {
        capsLock: false,
        shift_pressed: false,  
        alt_pressed: false        
    },

    keyLayoutNow: [], 

    keyLayoutRu: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'DEL', 
        'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER', 
        'Shift', '\\', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '/', '↑', 'Shift',  
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'
    ],

    keyLayoutEn: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL', 
        'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER', 
        'Shift', '\\', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '.', ',', '/', '↑', 'Shift',  
        'Ctrl', 'Win', 'Alt', '', 'Alt', 'Ctrl', '←', '↓', '→'
    ],

    init() {

        this.elements.input = document.createElement('textarea');
        document.body.appendChild(this.elements.input);
        
        this.elements.main = document.createElement('div');
        this.elements.main.classList.add('keyboard');
        document.body.appendChild(this.elements.main);

        this.createKeys();          
    },

    createKeys() {

        let isEnglish = localStorage.getItem('isEnglish');

        if ( isEnglish === 'true')
            KeyBoard.keyLayoutNow = KeyBoard.keyLayoutEn;
        else           
            KeyBoard.keyLayoutNow = KeyBoard.keyLayoutRu;        
       
        this.generateKeyLayout();     
        
        document.body.onkeydown = KeyBoard.handleKeyPressDown;
        document.body.onkeyup = KeyBoard.handleKeyPressUp;
    },

    generateKeyLayout () {        

        this.keyLayoutNow.forEach( (key, index) => {

            let keyElement = document.createElement('button');
            keyElement.classList.add('key');
            keyElement.innerHTML = key;   

            switch(index) {

                case 14: {
                    keyElement.classList.add('key_level_0_5');
                    break;
                }
                case 56: 
                case 61: {
                    keyElement.classList.add('key_level_1');
                    break;
                }
                case 41: {
                    keyElement.classList.add('key_level_1_5');
                    break;
                }
                case 29: 
                case 42: {
                    keyElement.classList.add('key_level_2');
                    break;
                }
                case 13: {
                    keyElement.classList.add('key_level_3');
                    break;
                }
                case 59: {
                    keyElement.classList.add('key_level_4');
                    break;
                }
            }

            keyElement.addEventListener('mousedown', (e) => {
                KeyBoard.mouseDown(keyElement, index);
            });

            keyElement.addEventListener('mouseup', (e) => {
                KeyBoard.mouseUp(keyElement, index);
            });

            this.elements.keyElements.push(keyElement);
            this.elements.main.appendChild(keyElement);
        });        
    },

    handleKeyPressDown(e) {

        let index = KeyBoard.elements.keyCode.indexOf(e.keyCode);

        if (index !== -1) {

            if (e.code === 'ShiftRight' || e.code === 'ControlRight' || e.code === 'AltRight')
                index = KeyBoard.elements.keyCode.lastIndexOf(e.keyCode);            

            let element = KeyBoard.elements.keyElements[index];
            
            element.classList.add('key_pressed_down');

            KeyBoard.switchWithKeyCode(e.key, e.keyCode, e);                      
        }
        else throw new Error('Error with values in KeyBoard.elements.keyCode ');    
    },

    switchWithKeyCode(key, eKeyCode, e) {

        console.log('key - ' + key);
        switch(key) {            

            case 'Backspace':
            case 'Delete': {
                let value = KeyBoard.elements.input.value;
                KeyBoard.elements.input.value = value.slice(0, value.length - 1);
                break;
            }

            case 'CapsLock': {
                KeyBoard.properties.capsLock = !KeyBoard.properties.capsLock;
                break;
            }

            case 'Enter': {
                KeyBoard.elements.input.value += '\n';
                break;
            }

            case ' ': {
                KeyBoard.elements.input.value += ' ';
                break;
            }

            case 'Shift': {

                KeyBoard.properties.shift_pressed = true;

                if (KeyBoard.properties.alt_pressed)
                    KeyBoard.changeLanguage();

                // изменям клавиатуру под шифт
                KeyBoard.keyLayoutWithShiftOn();                  

                break;
            }

            case 'Alt':            
            case 'AltGraph':  {

                KeyBoard.properties.alt_pressed = true;

                if (KeyBoard.properties.shift_pressed)
                    KeyBoard.changeLanguage();
                break;
            }

            case 'ArrowUp':
            case 'ArrowLeft':   
            case 'ArrowRight':
            case 'ArrowDown':
            case 'Control':
            case 'Meta': break;            

            case 'Tab': {
                KeyBoard.elements.input.value += '   ';
                if (e)
                    e.preventDefault(); // При клике мышкой, event не передаю
                break;
            }

            default: {                    

                let index = KeyBoard.elements.keyCode.indexOf(eKeyCode),
                    element = KeyBoard.elements.keyElements[index]; 

                if (KeyBoard.properties.capsLock || KeyBoard.properties.shift_pressed)
                    KeyBoard.elements.input.value += element.innerHTML.toUpperCase(); 
                else KeyBoard.elements.input.value += element.innerHTML.toLowerCase();
                
                break;
            }
        } 
    },

    handleKeyPressUp(e) {        

        console.log(e.keyCode);
        if (e.keyCode === 16) {
            KeyBoard.properties.shift_pressed = false;
            KeyBoard.keyLayoutWithShiftOff();
        }            

        if (e.keyCode === 18)            
        KeyBoard.properties.alt_pressed = false;

        let index = KeyBoard.elements.keyCode.indexOf(e.keyCode);

        if (index !== -1) {

            if (e.code === 'ShiftRight' || e.code === 'ControlRight' || e.code === 'AltRight')
                index = KeyBoard.elements.keyCode.lastIndexOf(e.keyCode);

            let element = KeyBoard.elements.keyElements[index];
            element.classList.remove('key_pressed_down');
            element.classList.add('key_pressed_up');

            setTimeout( () => element.classList.remove('key_pressed_up'), 200);            
        }       
    },

    changeLanguage() {

        if (this.keyLayoutNow === this.keyLayoutRu) {

            this.keyLayoutNow = this.keyLayoutEn;
            localStorage.setItem('isEnglish', 'true');
        }            
        else {
            this.keyLayoutNow = this.keyLayoutRu;
            localStorage.setItem('isEnglish', 'false');
        } 
  
        this.elements.keyElements.forEach( (key, index) => {
            key.innerHTML = this.keyLayoutNow[index];   
        });

        document.body.onkeydown = KeyBoard.handleKeyPressDown;
        document.body.onkeyup = KeyBoard.handleKeyPressUp;
    },

    keyLayoutWithShiftOn() {        

        let objEn = {
            0: '~', 1: '!', 2: '@', 3:'#', 4: '$', 5: '%', 6: '^', 7: '&',
            8: '*', 9: '(', 10: ')', 11: '_', 12: '+', 25: '{', 26: '}', 27: '|',
            39: ':', 40: '"', 51: '<', 52: '>', 53: '?'      
        };

        let objRu = {
            0: 'ё', 1: '!', 2: '"', 3:'№', 4: ';', 5: '%', 6: ':', 7: '?',
            8: '*', 9: '(', 10: ')', 11: '_', 12: '+', 25: 'Х', 26: 'Ъ', 27: '/',
            39: 'Ж', 40: 'Э', 51: 'Б', 52: 'Ю', 53: ','      
        };

        KeyBoard.elements.KeyElementsBefore = {
            0: '~', 1: '!', 2: '@', 3:'#', 4: '$', 5: '%', 6: '^', 7: '&',
            8: '*', 9: '(', 10: ')', 11: '_', 12: '+', 25: '{', 26: '}', 27: '|',
            39: ':', 40: '"', 51: '<', 52: '>', 53: '?'      
        };   

        let obj;
        
        if (this.keyLayoutNow === this.keyLayoutEn)
            obj = objEn;
        else obj = objRu;

        for (let key in obj) {
            
            KeyBoard.elements.KeyElementsBefore[key] = this.elements.keyElements[key].innerHTML;
            this.elements.keyElements[key].innerHTML = obj[key];
        }
    },

    keyLayoutWithShiftOff() {

        let objBefore = KeyBoard.elements.KeyElementsBefore;

        for (let key in objBefore)
            this.elements.keyElements[key].innerHTML = objBefore[key];        
        
        // происходит баг когда мы меняем язык наши элементы после отпускания 
        // возвращаются, но язык уже был изменён, и поэтому они не актуальны, 
        // так как сначала меняется язык, а потом возвращаются эти элементы
        this.changeLanguage();
        this.changeLanguage();
    },

    mouseDown(element ,index) {

        element.classList.add('key_pressed_down');

        let key = this.elements.keys[index];
        let keyCode = this.elements.keyCode[index];

        this.switchWithKeyCode(key, keyCode);
    },

    mouseUp(element ,index) {
        
        console.log(this.elements.keyCode[index]);

        if (this.elements.keyCode[index] === 16) {
            KeyBoard.properties.shift_pressed = false;
            KeyBoard.keyLayoutWithShiftOff();
        }

        if (this.elements.keyCode[index] === 18)
            KeyBoard.properties.alt_pressed = false;

        element.classList.remove('key_pressed_down');
        element.classList.add('key_pressed_up');

        setTimeout( () => { element.classList.remove('key_pressed_up');}, 200);    
    }
};

window.addEventListener('DOMContentLoaded', function () {
    KeyBoard.init();
});