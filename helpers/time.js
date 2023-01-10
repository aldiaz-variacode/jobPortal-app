module.exports = {
    subtractDate: (dateA, dateNow) => {
        const subtract = dateA.getTime() - dateNow.getTime();
        return subtract/1000/60/60;
    }
}