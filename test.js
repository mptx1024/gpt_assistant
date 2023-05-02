const fs = require('fs');

let lib = require('./features/AiRole/utils/roleLibarary.json');

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
for (let i = 0; i < lib.length; i++) {
    lib[i]['roleName'] = lib[i]['role'];
    delete lib[i]['role'];
    lib[i]['prompt'] = capitalizeFirstLetter(lib[i]['prompt']);
}

fs.writeFile('./features/AiRole/utils/roleLibarary.json', JSON.stringify(lib, null, 2), (err) => {
    if (err) throw err;
    else console.log('The file has been saved!');
});
