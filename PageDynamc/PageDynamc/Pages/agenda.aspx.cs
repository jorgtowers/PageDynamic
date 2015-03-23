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
    public partial class agenda : PageDynamic<Agenda>
    {
        protected override void OnInit(EventArgs e)
        {
            base.Panel = PN;
            base.OnInit(e);
        }
    }
}