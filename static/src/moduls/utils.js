'use strict';

function zeroToTomeNumber (numb) {
    if (0 < numb && numb < 10) {
        return `0${numb}`;
    }

    if (numb < 0) {
        return '00'
    }

    return numb;
}

async function getRequest(url) {
    const options = {
        method: 'GET',
        headers: {}      
        },
        request = await fetch(url, options);

    if (!request.ok) {
        throw new Error(`Error to connect to ${url} with ${request.status}`)
    }

    return await request.json();
    
}

async function postRequest(url, method, body) {
    const options = {
        method: method,
        headers: {'content-type': 'application/json; charset=utf8'}      
        };

    options.body = JSON.stringify(body);

    return await fetch(url, options);
}

export {zeroToTomeNumber, getRequest, postRequest};