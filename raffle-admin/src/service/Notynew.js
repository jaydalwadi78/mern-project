import Noty from 'noty';

const newNoty = (type = 'success', layout = 'topRight', msg = '', timeout = '3000') => {
    new Noty({
       type: type,
       layout: layout,
       theme: 'metroui',
       text: msg,
       timeout: timeout,
       progressBar: true,
       closeWith: ['click'],
       killer: true
    }).show();
}

export default newNoty;