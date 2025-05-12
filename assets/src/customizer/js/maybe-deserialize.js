
export default function maybe_deserialize(value) {
    if (_.isString(value)) {
        try {
            value = JSON.parse(decodeURIComponent(value));
        } catch (e) {

        }
    }

    return value;
}







