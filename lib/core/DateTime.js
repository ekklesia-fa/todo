export default {
    setLocalDateForm() {
        const d = new Date();
        return this.setZeroToTen(d.getDate()) + '/' + this.setZeroToTen(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + this.setZeroToTen(d.getHours()) + ':' + this.setZeroToTen(d.getMinutes());
    },
    setZeroToTen(a) {
        return (a < 10) ? '0' + a : a;
    },
    setGlobalDate(dt) {
        let bln1 = dt.slice(3, 5);
        let tgl1 = dt.slice(0, 2);
        let full1 = dt.slice(6, 15);
        return new Date(bln1 + '/' + tgl1 + '/' + full1);
    },
    timeNow() {
        const d = new Date();
        return this.setZeroToTen(d.getHours()) + ':' + this.setZeroToTen(d.getMinutes());
    },
    dateMin() {
        const d = new Date();
        return d.getFullYear() + '-' + this.setZeroToTen((d.getMonth() + 1)) + '-' + this.setZeroToTen(d.getDate());
    }
}