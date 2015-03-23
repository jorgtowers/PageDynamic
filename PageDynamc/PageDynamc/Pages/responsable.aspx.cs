using GenericRepository;
using PageDynamc.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace PageDynamc.Pages
{
    public partial class responsable : PageDynamic<Responsable>
    {
        protected override void OnInit(EventArgs e)
        {
            base.Panel = PN_RESPONSABLES;
            base.OnInit(e);
        }
    }
}