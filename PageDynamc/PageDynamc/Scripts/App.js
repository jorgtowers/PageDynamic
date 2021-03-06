﻿/*!
 * ABOUT:		Snippet Javascript implement OOP
 * CREADOR: 		Jorge L. Torres A.
 * NOTA: 		Cambiar el nombre App por el nombre que se le de al objeto en javascript
 * METODO: 		Para implementar un nuevo método tomar como referencia código "App.prototype.NuevoMetodo"
 */

(function (namespace) {
    //Constructor    
    function App() {
        this.Constructor();
    }
    //Variables Estaticas
    App.STARTTIME = new Date();
    //Variables Privadas
    var myVariable = App.prototype;
    var _Tracert = true;
    var _Result = null;

    //Metodos
    App.prototype.Constructor = function () {
        this.myVariable = null;
        this.Utils.DisplayWhenEditing();
        this.Utils.KeyBoard();
        if (_Tracert) { console.log("App inicializado correctamente..." + this.Runtime(App.STARTTIME)); }
    };

    App.prototype.Utils = {
        Callback: function (url, parametros, callback) {
            if (_Tracert) { console.log('metodo: "App.UI.CallBack(url, parametros, callback)" ha cargado exitosamente'); }
            if (url != null) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 200) {
                        data = JSON.parse(request.responseText);
                        if (data != null) {
                            _Result = data;
                        }
                        else {
                            _Result = null;
                        }
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                };
                request.open('GET', url + (parametros != null ? "?" + parametros : ""), true);
                request.send();
            } else {
                _Result = null;
            }
        },
        NoEnter: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.NoEnter()" ha cargado exitosamente'); }
            return !(window.event && window.event.keyCode === 13);
        },
        ValidarCampos: function (idContentPlaceHolder, applyClass) {
            if (_Tracert) { console.log('metodo: "App.Utils.ValidarCampos(idContentPlaceHolder, applyClass)" ha cargado exitosamente'); }
            /// <summary>Permite validar todos los elemento de tipo TEXT, FILE, TEXTAREA y SELECT</summary>  
            /// <param name="idContentPlaceHolder" type="string">Id del contenedor de los elementos a evaluar, sino se especifica tomará por defecto el "document"</param>            
            var contenedor;
            if (idContentPlaceHolder !== null && idContentPlaceHolder.length > 0) {
                contenedor = document.getElementById(idContentPlaceHolder);
            } else {
                contenedor = document;
            }
            var vacios = [];
            var obj = null;
            var inputs = contenedor.querySelectorAll("input[type=text]");
            var files = contenedor.querySelectorAll("input[type=file]");
            var textAreas = contenedor.getElementsByTagName("textarea");
            var selects = contenedor.getElementsByTagName("select");
            var objects = [];
            objects.push.apply(objects, inputs);
            objects.push.apply(objects, files);
            objects.push.apply(objects, textAreas);
            objects.push.apply(objects, selects);
            for (i = 0; i < objects.length; i++) {
                obj = objects[i];
                if (!obj.disabled) {
                    if (obj.getAttribute("optional") === null) {//Si tiene atributo opcional no validará
                        if (obj.value.length === 0) // Valida si es TEXTO que no este vacio y si es numero que sea mayor a 0
                        {
                            if (applyClass) {
                                this.ClassCss.Add(obj, "requerido");
                            }
                            if (obj.getAttribute("title") !== null) {
                                vacios.push(obj.getAttribute("title").toUpperCase());
                            } else {
                                vacios.push("ID: " + obj.id.toUpperCase());
                            }
                        } else {
                            this.ClassCss.Remove(obj, "requerido");
                        }
                    }
                }

            }
            if (vacios.length > 0) {
                if (!applyClass) {
                    alert("ATENCIÓN: Hay un(os) campo(s) vacio(s):\r\r" + vacios.toString().replace(/,/g, '\r') + "\r\rPor favor ingrese la información y vuelva a intentarlo.");
                }
                if (_Tracert) { console.log("App.Utils.ValidarCampos(): Elementos vacios " + vacios.toString()); }
                /* Chequea si tiene un contendor como un DIV*/
                for (i = 0; i < objects.length; i++) {
                    obj = objects[i];
                    if (!obj.disabled) {
                        if (obj.getAttribute("optional") === null) { //Si tiene atributo opcional no validará
                            if (obj.value.length === 0)
                                //if (isNaN(obj.value) ? obj.value.length == 0 : parseInt(obj.value) < 0) // Valida si es TEXTO que no este vacio y si es numero que sea mayor a 0
                            {
                                var objContent = obj.parentElement;
                                if (objContent !== null) {
                                    if (objContent.style.display === 'none') {
                                        objContent.style.display = 'block';
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                return false;
            }
        },
        NoRefresh: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.NoRefresh()" ha cargado exitosamente'); }
            document.onkeydown = function (e) {
                var key;
                if (window.event) {
                    key = event.keyCode;
                } else {
                    var unicode = e.keyCode ? e.keyCode : e.charCode;
                    key = unicode;
                }
                switch (key) {
                    case 116:
                        event.returnValue = false;
                        key = 0;
                        return false;
                    case 82:
                        if (event.ctrlKey) {
                            event.returnValue = false;
                            key = 0;
                            return false;
                        }
                        return false;
                    default:
                        return true;
                }
            };
        },
        ClassCss: {
            HasClass: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.HasClass(elemento, App)" ha cargado exitosamente'); }
                return new RegExp('(\\s|^)' + App + '(\\s|$)').test(elemento.className);
            },
            Add: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.Add(elemento, App)" ha cargado exitosamente'); }
                if (!this.HasClass(elemento, App)) { elemento.className += (elemento.className ? ' ' : '') + App; }
            },
            Remove: function (elemento, App) {
                if (_Tracert) { console.log('metodo: "App.Utils.ClassCss.Remove(elemento, App)" ha cargado exitosamente'); }
                if (this.HasClass(elemento, App)) {
                    elemento.className = elemento.className.replace(new RegExp('(\\s|^)' + App + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
                }
            }
        },
        Toogle: function (elemento) {
            if (_Tracert) { console.log('metodo: "App.Utils.Toogle(elemento)" ha cargado exitosamente'); }
            var el = document.getElementById(elemento);
            if (el.style.display == "block") {
                el.style.display = "none";
            } else {
                el.style.display = "block";
            }
        },
        DisplayWhenEditing: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.DisplayWhenEditing()" ha cargado exitosamente'); }
            var id = document.getElementById("CPH_BODY_txtId");
            if (id !== null && id.value > 0) {
                this.Toogle('editPanel');
            }
        },
        GetFecha: function (elemento) {
            if (_Tracert) { console.log('metodo: "App.Utils.GetFecha(elemento)" ha cargado exitosamente'); }
            var obj = document.getElementById(elemento);
            if (obj !== null) {
                var date = new Date();
                var str = this.LPad(date.getDate(), 2) + "-" + this.LPad((date.getMonth() + 1), 2) + "-" + date.getFullYear() + " " + this.LPad(date.getHours(), 2) + ":" + this.LPad(date.getMinutes(), 2) + ":" + this.LPad(date.getSeconds(), 2);
                obj.value = str;
            }
        },
        LPad: function (value, padding) {
            if (_Tracert) { console.log('metodo: "App.Utils.LPad(value, padding)" ha cargado exitosamente'); }
            var zeroes = "0";
            for (var i = 0; i < padding; i++) { zeroes += "0"; }
            return (zeroes + value).slice(padding * -1);
        },
        KeyBoard: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.KeyBoard()" ha cargado exitosamente'); }
            var self = this;
            document.onkeydown = function (e) {
                var key;
                if (window.event) {
                    key = event.keyCode
                }
                else {
                    var unicode = e.keyCode ? e.keyCode : e.charCode
                    key = unicode
                }
                switch (key.toString()) {
                    case "116": //F5
                        event.returnValue = false;
                        key = 0;
                        return false;
                    case "82": //R button
                        if (event.ctrlKey) {
                            event.returnValue = false;
                            key = 0;
                            return false;
                        }
                        break;
                    case "120": //F9
                        event.returnValue = false;
                        key = 0;
                        self.Toogle('editPanel');
                        var txts = document.getElementsByClassName("form-control");
                        txts[1].focus();
                        return false;
                }
            };
        },
        VersionIE: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.VersionIE()" ha cargado exitosamente'); }
            var myNav = navigator.userAgent.toLowerCase();
            return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 0) : false;
        },
        QueryString: function (name) {
            if (_Tracert) { console.log('metodo: "App.Utils.QueryString(name)" ha cargado exitosamente'); }
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results === null) {
                return "";
            } else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
            }
        },
        CheckConnection: function () {
            if (_Tracert) { console.log('metodo: "App.Utils.CheckConnection()" ha cargado exitosamente'); }
            /// <summary>Valida que la conexi�n de internet este activa.</summary>
            if (navigator.onLine !== undefined) {
                if (navigator.onLine) {
                    return true;
                } else {
                    return false;
                }
            } else {
                var xhr = new XMLHttpRequest();
                var file = "http://" + window.location.host + "/";
                var r = Math.round(Math.random() * 10000);
                xhr.open('HEAD', file + "?CheckConnection=" + r, false);
                try {
                    xhr.send();
                    if (xhr.status >= 200 && xhr.status < 304) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            }
        }
    };


    App.prototype.UI = {
        Paginador: {
            Contenedor: "",
            ItemsPorPagina: 0,
            MaximoPaginas: 0,
            AgregarClaseCss: "",
            Mostrar: function () {
                if (_Tracert) { console.log('metodo: "App.UI.Paginador.Mostrar()" ha cargado exitosamente'); }
                nombreContenedor = this.Contenedor;
                itemsPorPagina = this.ItemsPorPagina;
                maximoPaginasAMostrar = this.MaximoPaginas;
                addClassPagina = this.AgregarClaseCss;
                /// <summary>P�ginador din�mico creado v�a JavaScript.</summary>
                /// <param name="nombreContenedor" type="String">Nombre del contenedor para buscar el elemento por el metodo document.getElementById, donde se alojar�n las nuevas p�ginas generadas por el p�ginador.</param>
                /// <param name="itemsPorPagina" type="Number">Indica la cantidad de elementos por p�gina, por defecto se establece 5.</param>
                /// <param name="maximoPaginasAMostrar" type="Number">Indica la cantidad de p�ginas activas mostradas por el p�ginador, por defecto se establece 10.</param>
                /// <param name="addClassPagina" type="String">Agrega una subclase a cada p�gina generada.</param>
                /// <seealso cref="paginador">M�todo requerido por NT.Paginador</seealso>
                /// <returns type="Void">Construye p�ginas usando Divs y asinandole el Id='pagina+iteradorPaginas'.</returns>
                try {
                    if (nombreContenedor.length > 0) {
                        var contenedor = document.getElementById(nombreContenedor);
                        contenedor.insertAdjacentHTML('afterEnd', ' <div id="paginador"></div> ');
                        if (contenedor.parentNode.className === "ajax_waiting") { contenedor.parentNode.className = ""; }
                        var notas = contenedor.childNodes;
                        var paginador = document.getElementById("paginador");
                        if (notas !== null) {
                            var inicioPagina = 0;
                            var finPagina = itemsPorPagina;
                            var totalItems = notas.length;
                            var paginas = Math.ceil(totalItems / itemsPorPagina);
                            var oldDivs = [];
                            oldDivs.push.apply(oldDivs, notas);
                            for (a = 0; a < paginas; a++) {
                                var div = document.createElement("div");
                                div.id = "pagina" + a;
                                div.className = "pagina " + (addClassPagina !== undefined ? addClassPagina : '');
                                if (a === 0) {
                                    div.style.display = 'block';
                                }
                                else {
                                    div.style.display = 'none';
                                }
                                contenedor.appendChild(div);
                            }
                            for (b = 0; b < paginas; b++) {
                                var pagina = null;
                                var temp = new Array();
                                pagina = document.getElementById("pagina" + b);
                                temp = oldDivs.slice(inicioPagina, finPagina);
                                for (i = 0; i < temp.length; i++) {
                                    pagina.appendChild(temp[i]);
                                }
                                finPagina = itemsPorPagina * (b + 2);
                                inicioPagina = finPagina - itemsPorPagina;
                            }
                            for (c = 0; c < (paginas > maximoPaginasAMostrar ? maximoPaginasAMostrar : paginas) - 1; c++) {
                                var elemento = document.createElement("a");
                                elemento.id = "link" + c;
                                elemento.href = "javascript:UI.Paginador.Mover('link" + c + "','pagina" + c + "')";
                                elemento.innerHTML = c + 1;
                                if (c === 0) {
                                    elemento.className = "numeroPagina activa";
                                }
                                else {
                                    elemento.className = "numeroPagina";
                                }
                                paginador.appendChild(elemento);
                            }
                            contenedor.style.display = 'block';
                        }
                    }
                }
                catch (err) {

                    console.log('error en Metodo: "paginadorMostrar(nombreContenedor,  itemsPorPagina, maximoPaginasAMostrar)", ' + err.message);

                }
            },
            Mover: function (nombrelink, nombrePagina) {
                if (_Tracert) { console.log('metodo: "App.UI.Paginador.Mover(nombrelink, nombrePagina)" ha cargado exitosamente'); }
                /// <summary>Muestra una p�gina requerida por el p�ginador.</summary>
                /// <param name="nombrelink" type="String">Nombre del Link para buscar el elemento por el metodo document.getElementById y asignarle la clase "numeroPagina activa".</param>
                /// <param name="nombrePagina" type="String">Obtiene la colecci�n de p�ginas para mostrar la que se este pidiendo mostrar, y se activa pagina[i]style.display='block'.</param>
                /// <seealso cref="paginador">M�todo requerido por NT.Paginador</seealso>
                /// <returns type="Void">No retorna valor.</returns>
                var paginas = document.querySelectorAll("div.pagina");
                var pagina = document.getElementById(nombrePagina);
                var link = document.getElementById(nombrelink);
                var links = document.querySelectorAll("a.numeroPagina");
                if (links !== null) {
                    for (i = 0; i < links.length; i++) {
                        links[i].className = 'numeroPagina';
                    }
                }
                if (paginas !== null) {
                    for (i = 0; i < paginas.length; i++) {
                        paginas[i].style.display = 'none';
                    }
                }
                if (pagina !== null) {
                    pagina.style.display = 'block';
                }
                if (link !== null) {
                    link.className = "numeroPagina activa";
                }
            }
        }
    };

    App.prototype.Runtime = function (starTime) {
        if (_Tracert) { console.log('metodo: "App.Runtime(starTime)" ha cargado exitosamente'); }
        return (((new Date() - starTime) / 1000).toFixed(2) + " segundos...");
    };

    //Metodos por deprecar
    App.prototype.Toogle = function (elemento) {
        var self = this;
        var e = "[deprecated] App.Toogle(elemento) está Obsoleto, por favor usar App.Utils.Toogle(elemento). Este metodo será removido en futuras versiones.";
        if (!this.Utils.Toogle) { throw (e); }
        (this.Toogle = function () {
            console.log(e);
            self.Utils.Toogle(elemento);
        })();
    }
    App.prototype.Obtener = function (url, parametros, callback) {
        var self = this;
        var e = "[deprecated] App.Obtener(url, parametros, callback) está Obsoleto, por favor usar App.Utils.Callback(url, parametros, callback). Este metodo será removido en futuras versiones.";
        if (!this.Utils.Callback) { throw (e); }
        (this.Obtener = function () {
            console.log(e);
            self.Utils.Callback(url, parametros, callback);
        })();
    }


    //Propiedades
    Object.defineProperty(Object.prototype, 'Enum', {
        value: function () {
            for (i in arguments) {
                Object.defineProperty(this, arguments[i], {
                    value: parseInt(i, 2),
                    writable: false,
                    enumerable: true,
                    configurable: true
                });
            }
            return this;
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(App.prototype, "Resultado", {
        get: function Resultado() {
            return _result;
        }
    });
    Object.defineProperty(App.prototype, "Tracert", {
        get: function Tracert() {
            return _Tracert;
        },
        set: function Tracert(value) {
            _Tracert = value;
        }
    });

    /* Para Usar como plantilla para nuevos metodos, metodos obsoletos y/o propiedades 

         App.prototype.SUB_NAMESPACE = {
            METODO1: function () {
            },
            SUBCLASE: {
                METODO1: function () { },
                METODO2: function () { }
            }
        };

        App.prototype.NuevoMetodo = function (callback) {
            if (_Tracert) { console.log('metodo: "App.NuevoMetodo()" ha cargado exitosamente'); }
            var STARTTIME = new Date();
            var self = this;

            if (typeof callback === 'function') {
                callback();
            }

            if (_Tracert) { console.log('"App.NuevoMetodo()" realizado en ' + this.Runtime(STARTTIME)); }
        };

        //Marcar Método Obsoleto
        App.prototype.MetodoObsoleto = function () {
            var self = this;
            var e = "[deprecated] MetodoObsoleto está Obsoleto y será removido en futuras versiones. Usar el siguiente método NOMBRE_NUEVO_METODO";
            if (!this.NOMBRE_NUEVO_METODO) { throw (e); }
            (this.MetodoObsoleto = function () {
                console.log(e);
                self.NOMBRE_NUEVO_METODO();
            })();
        }
        Object.defineProperty(App.prototype, "Propiedad", {
            get: function Propiedad() {
                return myVariable;
            },
            set: function Propiedad(value) {
                unidad = myVariable;
            }
        });

    */
    namespace.App = App;
}(window.jt = window.jt || {}));

window.onload = function () {
    this.app = new jt.App();
}
