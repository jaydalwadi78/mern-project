import loadable from '@loadable/component';
//-----

const PublicLayout = loadable(() => import('../layout/PublicLayout'))
PublicLayout.preload();


// const MainLayout = loadable(() => import('../layout/MainLayout'))

//-----
let Routparentpath;

const PageRoutes = [
    {
        path: Routparentpath = "/",
        component: loadable(() => import('../pages/Home')),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/raffle/:raffleid",
        component: loadable(() => import('../pages/Raffle')),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/profile",
        component: loadable(() => import('../pages/Profile')),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/winner",
        component: loadable(() => import('../pages/Winner')),
        layout: PublicLayout,
    }, 
    {
        path: Routparentpath = "/activity",
        component: loadable(() => import('../pages/Activity')),
        layout: PublicLayout,
    },  
    {
        path: Routparentpath = "/user-winner/:winnerid",
        component: loadable(() => import('../pages/UserWinner')),
        layout: PublicLayout,
    }, 
    {
        path: Routparentpath = "/raffle-ended",
        component: loadable(() => import('../pages/RaffleEnded')),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/privacy-policy",
        component: loadable(() => import('../pages/PrivacyPolicy')),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/cookie-policy",
        component: loadable(() => import('../pages/CookiePolicy')),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/terms-and-condition",
        component: loadable(() => import('../pages/TermsCondition')),
        layout: PublicLayout,
    },
    {
        path: (Routparentpath = "/completed"),
        component: loadable(() => import("../pages/Completed")),
        layout: PublicLayout,
    },
    {
        path: Routparentpath = "/reset/:code",
        component: loadable(() => import('../pages/ResetPassword')),
        layout: PublicLayout,
    }
]

export default PageRoutes;
