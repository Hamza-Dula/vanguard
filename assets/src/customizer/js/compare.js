export default function compare(value1, value2, operator) {
    let result = null;
    switch (operator) {
        case "=":
        case "==":
            result = (value1 == value2);
            break;

        case"===":
            result = (value1 === value2);
            break;

        case "!=":
            result = (value1 != value2);
            break;

        case "!==":
            result = (value1 !== value2);
            break;

        case ">":
            result = (value1 > value2);
            break;

        case ">=":
            result = (value1 >= value2);
            break;

        case "<":
            result = (value1 < value2);
            break;

        case "<=":
            result = (value1 <= value2);
            break;

        case "in":

            if (_.isArray(value2)) {
                result = (value2.indexOf(value1) !== -1);
            } else {
                if (_.isArray(value1)) {
                    result = (value1.indexOf(value2) !== -1);
                } else {
                    result = false;
                }
            }

            break;

    }


    return result;
}








