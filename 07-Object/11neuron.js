// Q6 Object Neuron
function neuron(arr) {
    let res = {};

    for (let i = 0; i < arr.length; i++) {
        let [type, ...rest] = arr[i].split(' ');
        type = type.replace(':', '').toLowerCase();

        if (['questions', 'orders', 'affirmations'].includes(type)) {
            let [statement, response] = parseStatementResponse(rest);
            let key = statement.replaceAll(' ', '_').replace(/[?!]/g, '').toLowerCase();

            res[type] ||= {};
            res[type][key] ||= { [type.slice(0, -1)]: statement, responses: [] };
            res[type][key]['responses'].push(response);
        }
    }

    return res;
}

function parseStatementResponse(arr) {
    let joinedStr = arr.join(' ');
    let splitIndex = joinedStr.indexOf('-');
    let statement = joinedStr.slice(0, splitIndex).trim();
    let response = joinedStr.slice(splitIndex + 1).replace('Response:', '').trim();

    return [statement, response];
}