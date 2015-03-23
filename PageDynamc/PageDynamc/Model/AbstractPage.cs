using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Data;
// Incorporar NameSpace del "GenericRepository.EF5" para usar la PageDynamic<TEntity>
using GenericRepository.EF5;
// Incorporar Namespace del "Proyecto.Model" para usar el contexto creado por ENTITY
using PageDynamc.Model;

namespace PageDynamc.Model
{
    
    public class AbstractPage:Page
    {

        protected GenericRepository<MetasEntities> model = new GenericRepository<MetasEntities>();     

        private int _Id = -1;
        protected int Id {
            get
            {
                return _Id;
            }            
        }
        private string _Clase = "";
        protected string Clase
        {
            get
            {
                return _Clase;
            }
        }

        /* En caso de tener lógica de validación de usuarios */
       // public Usuario UsuarioActual
       //{
       //    get {
       //        if (Session["responsable"] != null)
       //            return (Usuario)Session["responsable"];
       //        else
       //            return null;
       //    }
       //    set { 
       //        Session["responsable"] = value;                
       //        Session.Timeout = 60 * 24;//El tiempo de la session dura 24 horas
       //    }
       //}
        
        protected void CheckParametrosUrlRouting()
        {
           /* Parametros vía Routing */
        }
        protected void CheckParametrosUrlQueryString()
        {
          
            /* Id Noticia, Encuesta, etc...*/
            if (!object.Equals(Request.QueryString["Id"], null))
                int.TryParse(Request.QueryString["Id"] as string, out _Id);
            if (!object.Equals(Request.QueryString["Clase"], null))
                _Clase = Request.QueryString["Clase"] as string;            
        }

        protected override void OnLoad(EventArgs e)
        {
            
            if (RouteData.Values.Count > 0)
                CheckParametrosUrlRouting();

            if (Request.QueryString.Count > 0)
                CheckParametrosUrlQueryString();

            this.Title = "Página Dínamica";

            /* Valida que el usuario este logueado */
            //if (Request.Url.AbsolutePath != "/pages/login.aspx" && UsuarioActual == null)
            //    if (Request.Url.AbsolutePath != "/pages/registro.aspx")
            //        Response.Redirect("~/pages/login.aspx");

            base.OnLoad(e);
        }
        
    }
}