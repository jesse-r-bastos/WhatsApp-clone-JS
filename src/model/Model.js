const { ClassEvent } = require("../utils/ClassEvent");

/**
 * Controle Dados JSON 
 */
import { ClassEvent } from '../utils/ClassEvent';

export class Model extends ClassEvent{

    constructor(){
        //console.log('Model constructor OK!!');
        super();
        this._data = {};
    }

    fromJSON(json){
        //console.log('Model fromJSON json=', json);
        this._data = Object.assign(this._data, json );
        this.trigger('datachange', this.toJSON());
    }

    toJSON(){
        //console.log('Model toJSON _datan=', this._data);
        return this._data;
    }

}