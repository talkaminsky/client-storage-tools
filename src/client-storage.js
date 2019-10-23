function clientStorage() {
    this.getItem = function getItem(key) {
        const stringValue = localStorage.getItem(key);
        if (stringValue) {
            let value;
            try {
                value = JSON.parse(stringValue);
            } catch (e) {
                return stringValue;
            }

            if (value && value.expirationDate) {
                const expirationDate = new Date(value.expirationDate);
                if (expirationDate > new Date()) {
                    return value.value;
                } else {
                    localStorage.removeItem(key);
                }
            } else {
                return stringValue;
            }
        }
    }

    this.setItem = function setItem(key, value, expirationInSec = 31536000) {
        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + expirationInSec);
        const newValue = {
            value: value,
            expirationDate: expirationDate.toISOString()
        };

        localStorage.setItem(key, JSON.stringify(newValue));
    }

    this.removeItem = function removeItem(key) {
        localStorage.removeItem(key);
    }
}

module.exports = new clientStorage();