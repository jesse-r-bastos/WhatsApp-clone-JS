/**
 * Upload de Arquivos
**/
import { Firebase } from '../utils/Firebase';

export class Upload {

    static send(file, from) {

        console.info('Upload', file, from);

        return new Promise((s, f) => {

            let uploadTask = Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file);

            uploadTask.on('state_changed', e => {

            }, err => {

                f(err)

            }, () => {

                s(uploadTask.snapshot);

            });

        });


    }

}