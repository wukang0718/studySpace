const a = {}
Object.defineProperty(a, 'b', {
    get: function () {
        console.log('get a.b');
        return this._b
    },
    set(val) {
        console.log('set a.b', val);
        this._b = val;
    }
})

const yuan1 = {};
Object.defineProperties(yuan1, {
    b: {
        enumerable: false,
        value: 1212,
    }
})

// Object.assign 不会调用不可枚举的属性
console.log('Object.assign 不会调用不可枚举的属性');
Object.assign(a, yuan1)
// ------------------------------
console.log('--------------------------------------------------------');
const yuan2 = {};
Object.defineProperty(yuan2, 'b', {
    enumerable: true,
    get: function () {
        console.log('get yuan2.b');
        return 'yuan2.b';
    }
})
console.log('会触发目标对象的set方法，不会调用源对象的get方法');
// 会触发目标对象的set方法，调用源对象的get方法
Object.assign(a, yuan2)
// ------------------------------
console.log('------------------------');
console.log('不会调用源对象的继承属性，即只调用自有属性,包括symbol属性');
const yuan3 = Object.create({b: '继承的yuan3.b'})
const s = Symbol()
Object.defineProperty(yuan3, s, {
    enumerable: true,
    get: () => {
        console.log('get yuan3.s symbol 属性');
        return s;
    }
})
Object.assign(a, yuan3)
console.log(a.b);