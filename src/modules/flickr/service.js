/**
 * Created by leoliang on 2017/1/8.
 */

import Flickr from 'flickrapi';
import config from '../../../config/config';
import Q from 'q';

let client = null;

module.exports = {
    'init': function *() {
        client = new Flickr({
            api_key: config.flickr.apiKey
        });
    },
    'getPhotos': function () {
        return Q.ninvoke(client.photos, 'search', {
            text: "red+panda"
        });
    }
};