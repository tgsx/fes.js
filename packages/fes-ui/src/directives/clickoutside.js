import * as util from '../utils/util.js';

const cache = {};
let key = 1;
export default {
    inserted(el, binding) {
        el.outsideKey = key++;
        const self = {};
        self.documentHandler = (e) => {
            if (util.contains(el, e.target)) {
                return false;
            }
            if (binding.value) {
                binding.value();
            }
        };
        cache[el.outsideKey] = self;
        document.addEventListener('click', self.documentHandler);
    },
    unbind(el) {
        const self = cache[el.outsideKey];
        if (self) {
            document.removeEventListener('click', self.documentHandler);
            delete cache[el.outsideKey];
        }
    }
};
