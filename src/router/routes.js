const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    // meta: {
    //   guestPage: true,
    // },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "detail/:code",
        name: "detail",
        component: () => import("pages/DetailPage.vue"),
      },
      {
        path: "signin",
        name: "signin",
        component: () => import("pages/SignInPage.vue"),
      },
    ],
  },

  {
    path: "/admin",
    redirect: { name: "dashboard" },
    component: () => import("layouts/MainAdminLayout.vue"),
    // meta: {
    //   adminAuth: true,
    // },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("pages/admin/IndexPage.vue"),
      },
      {
        path: "author",
        name: "author",
        component: () => import("pages/admin/author/AuthorPage.vue"),
      },
      {
        path: "subject",
        name: "subject",
        component: () => import("pages/admin/subject/SubjectPage.vue"),
      },
      {
        path: "categories",
        name: "categories",
        component: () => import("pages/admin/categories/CategoriesPage.vue"),
      },
      {
        path: "repository",
        name: "repository",
        component: () => import("pages/admin/repository/RepositoryPage.vue"),
      },

      {
        path: "author-add",
        name: "author-add",
        component: () => import("pages/admin/author/AuthorAddPage.vue"),
      },
      {
        path: "subject-add",
        name: "subject-add",
        component: () => import("pages/admin/subject/SubjectAddPage.vue"),
      },
      {
        path: "categories-add",
        name: "categories-add",
        component: () => import("pages/admin/categories/CategoriesAddPage.vue"),
      },
      {
        path: "repository-add",
        name: "repository-add",
        component: () => import("pages/admin/repository/RepositoryAddPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
