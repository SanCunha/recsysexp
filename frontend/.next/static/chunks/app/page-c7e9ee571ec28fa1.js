(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    3674: function (e, s, t) {
      Promise.resolve().then(t.bind(t, 7820));
    },
    7820: function (e, s, t) {
      "use strict";
      t.r(s),
        t.d(s, {
          default: function () {
            return q;
          },
        });
      var r = t(9268),
        a = t(6006);
      t(5570);
      var i = t(3141),
        n = t(541),
        c = t(6602),
        l = t(7194),
        m = t(1932),
        o = t(5953),
        d = t(772),
        p = t.n(d),
        u = (e) => {
          let { onSelectChange: s } = e,
            [t, i] = (0, a.useState)(null);
          return (0, r.jsx)("div", {
            children: (0, r.jsxs)("div", {
              style: { marginRight: "20px" },
              children: [
                (0, r.jsx)("h2", { children: "Sele\xe7\xe3o de Arquivo" }),
                (0, r.jsx)("input", {
                  type: "file",
                  onChange: (e) => {
                    var t;
                    let r =
                      (null === (t = e.target.files) || void 0 === t
                        ? void 0
                        : t[0]) || null;
                    i(r), r && s(r.name.split(".")[0]);
                  },
                }),
                (0, r.jsx)("button", {
                  onClick: () => {
                    if (!t) {
                      console.error("Nenhum arquivo selecionado.");
                      return;
                    }
                    let e = new (p())();
                    e.append("file", t),
                      o.Z.request({
                        method: "post",
                        url: "http://localhost:5000/upload",
                        headers: { "Content-Type": "multipart/form-data" },
                        data: e,
                      })
                        .then((e) => {
                          console.log(JSON.stringify(e.data));
                        })
                        .catch((e) => {
                          console.log(e);
                        }),
                      console.log("Arquivo enviado:", t);
                  },
                  disabled: !t,
                  children: "Upload",
                }),
              ],
            }),
          });
        },
        x = (e) => {
          let { onSelectChange: s } = e,
            [t, i] = (0, a.useState)([]);
          return (
            (0, a.useEffect)(() => {
              o.Z.request({
                method: "get",
                maxBodyLength: 1 / 0,
                url: "http://localhost:5000/listar_pastas",
                headers: {},
              })
                .then((e) => {
                  console.log(e.data), i(e.data.datasets);
                })
                .catch((e) => {
                  console.error("Erro ao obter op\xe7\xf5es do servidor:", e);
                });
            }, []),
            (0, r.jsxs)("div", {
              children: [
                (0, r.jsx)("h2", { children: "Sele\xe7\xe3o no Select" }),
                (0, r.jsx)("select", {
                  onChange: (e) => {
                    let t = e.target.value;
                    s(t);
                  },
                  children: t.map((e) =>
                    (0, r.jsx)("option", { value: e, children: e }, e)
                  ),
                }),
              ],
            })
          );
        },
        _ = function (e) {
          let [s, t] = (0, a.useState)("select"),
            i = (s) => {
              e.set_dataset((t) => [
                ...t.slice(0, e.idx),
                {
                  ...t[e.idx],
                  config: {
                    ...t[e.idx].config,
                    dataset: {
                      ...t[e.idx].config.dataset,
                      parameters: {
                        ...t[e.idx].config.dataset.parameters,
                        name: s,
                      },
                    },
                  },
                },
                ...t.slice(e.idx + 1),
              ]);
            },
            n = (e) => {
              t(e);
            };
          return (0, r.jsxs)("div", {
            style: {
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            },
            children: [
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsx)("input", {
                        type: "radio",
                        id: "csvUploader",
                        value: "csvUploader",
                        checked: "csvUploader" === s,
                        onChange: () => n("csvUploader"),
                      }),
                      (0, r.jsx)("label", {
                        htmlFor: "csvUploader",
                        children: "Upload CSV",
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    style: { opacity: "csvUploader" === s ? 1 : 0.7 },
                    children: (0, r.jsx)(u, { onSelectChange: i }),
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsxs)("div", {
                    children: [
                      (0, r.jsx)("input", {
                        type: "radio",
                        id: "select",
                        value: "select",
                        checked: "select" === s,
                        onChange: () => n("select"),
                      }),
                      (0, r.jsx)("label", {
                        htmlFor: "select",
                        children: "Load CSV",
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    style: { opacity: "select" === s ? 1 : 0.7 },
                    children: (0, r.jsx)(x, { onSelectChange: i }),
                  }),
                ],
              }),
            ],
          });
        },
        f = t(783),
        g = t(6530),
        h = t(9071),
        b = t(9785),
        y = t(4240),
        v = t(6163),
        j = t(9409),
        k = t(4066),
        C = t(6263);
      let N = (0, C.Z)("form")((e) => {
        let { theme: s } = e;
        return { display: "flex", flexDirection: "column" };
      });
      var w = function (e) {
          let s = (t, a) => {
              let i = typeof a;
              switch (i) {
                case "string":
                case "number":
                  return (0, r.jsx)(g.Z, {
                    label: t,
                    value: a,
                    onChange: (s) =>
                      e.set_parameters(
                        "".concat(e.title, "-").concat(t),
                        s.target.value
                      ),
                    fullWidth: !0,
                    style: { marginBottom: "5px" },
                  });
                case "boolean":
                  return (0, r.jsx)(h.Z, {
                    control: (0, r.jsx)(
                      b.Z,
                      {
                        checked: a,
                        onChange: (s) =>
                          e.set_parameters(
                            "".concat(e.title, "-").concat(t),
                            s.target.checked
                          ),
                      },
                      "".concat(e.title, "-").concat(t)
                    ),
                    label: t,
                  });
                default:
                  return (0, r.jsx)("div", {
                    children: Object.entries(a).map((e) => {
                      let [a, i] = e;
                      return (0, r.jsx)(
                        "div",
                        { children: s("".concat(t, ".").concat(a), i) },
                        a
                      );
                    }),
                  });
              }
            },
            t = (s, t) => {
              t
                ? (console.log(e.idx),
                  console.log(e.father),
                  e.set_list((t) => [
                    ...t.slice(0, e.idx),
                    {
                      ...t[e.idx],
                      checkeds: {
                        ...t[e.idx].checkeds,
                        [e.father]: [...t[e.idx].checkeds[e.father], s],
                      },
                    },
                    ...t.slice(e.idx + 1),
                  ]))
                : e.set_list((t) => [
                    ...t.slice(0, e.idx),
                    {
                      ...t[e.idx],
                      checkeds: {
                        ...t[e.idx].checkeds,
                        [e.father]: t[e.idx].checkeds[e.father].filter(
                          (e) => e !== s
                        ),
                      },
                    },
                    ...t.slice(e.idx + 1),
                  ]);
            };
          return (0, r.jsxs)("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
              padding: "5px",
              maxWidth: "400px",
              margin: "1px",
            },
            children: [
              (0, r.jsxs)("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
                children: [
                  (0, r.jsx)(y.Z, { variant: "h6", children: e.title }),
                  (0, r.jsx)(h.Z, {
                    control: e.checkbox
                      ? (0, r.jsx)(v.Z, {
                          onChange: (s) => t(e.title, s.target.checked),
                        })
                      : (0, r.jsx)(j.Z, { checked: !0 }),
                    label: "",
                  }),
                ],
              }),
              (0, r.jsx)(N, {
                children: Object.entries(e.parameters).map((e) => {
                  let [t, a] = e;
                  return (0, r.jsx)(
                    k.ZP,
                    { item: !0, xs: 12, sm: 6, children: s(t, a) },
                    t
                  );
                }),
              }),
            ],
          });
        },
        S = function (e) {
          let s = (s, t) => {
            let r = e.preprocessing.parameters.instances,
              a = e.preprocessing.parameters.instances.findIndex(
                (e) => e.class_name == s.split("-")[0]
              );
            (r[a].parameters = {
              ...e.preprocessing.parameters.instances[a].parameters,
              [s.split("-")[1]]: t,
            }),
              e.set_preprocessing((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    preprocessing: {
                      ...s[e.idx].config.preprocessing,
                      parameters: { instances: r },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsx)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: e.preprocessing.parameters.instances.map((t) =>
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "preprocessing",
                    title: t.class_name,
                    parameters: t.parameters,
                    set_parameters: s,
                    checkbox: !0,
                    set_list: e.set_list,
                  },
                  t.class_name
                )
              ),
            }),
          });
        },
        I = function (e) {
          let s = (s, t) => {
            let r = e.hybrid.parameters.instances,
              a = e.hybrid.parameters.instances.findIndex(
                (e) => e.class_name == s.split("-")[0]
              );
            (r[a].parameters = {
              ...e.hybrid.parameters.instances[a].parameters,
              [s.split("-")[1]]: t,
            }),
              e.set_hybrid((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    hybrid: {
                      ...s[e.idx].config.hybrid,
                      parameters: { instances: r },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsx)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: e.hybrid.parameters.instances.map((t) =>
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "hybrid",
                    title: t.class_name,
                    parameters: t.parameters,
                    set_parameters: s,
                    checkbox: !0,
                    set_list: e.set_list,
                  },
                  t.class_name
                )
              ),
            }),
          });
        },
        z = function (e) {
          let s = (s, t) => {
            let r = e.metrics.parameters.instances,
              a = e.metrics.parameters.instances.findIndex(
                (e) => e.class_name == s.split("-")[0]
              );
            (r[a].parameters = {
              ...e.metrics.parameters.instances[a].parameters,
              [s.split("-")[1]]: t,
            }),
              e.set_metrics((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    metrics: {
                      ...s[e.idx].config.metrics,
                      parameters: { instances: r },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsx)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: e.metrics.parameters.instances.map((t) =>
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "metrics",
                    title: t.class_name,
                    parameters: t.parameters,
                    set_parameters: s,
                    checkbox: !0,
                    set_list: e.set_list,
                  },
                  t.class_name
                )
              ),
            }),
          });
        },
        Z = function (e) {
          let s = (s, t) => {
            console.log("new_instances");
            let r = e.visualization.parameters.instances;
            console.log(r);
            let a = e.visualization.parameters.instances.findIndex(
              (e) => e.class_name == s.split("-")[0]
            );
            (r[a].parameters.plot_types = {
              ...e.visualization.parameters.instances[a].parameters.plot_types,
              [s.split("-")[1]]: t,
            }),
              console.log(r),
              e.set_visualization((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    visualization: {
                      ...s[e.idx].config.visualization,
                      parameters: { instances: r },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsx)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: e.visualization.parameters.instances.map((t) =>
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "visualization",
                    title: t.class_name,
                    parameters: t.parameters.plot_types,
                    set_parameters: s,
                    checkbox: !0,
                    set_list: e.set_list,
                  },
                  t.class_name
                )
              ),
            }),
          });
        },
        P = function (e) {
          let s = (s, t) => {
            let r = e.metafeatures.parameters.instances,
              a = e.metafeatures.parameters.instances.findIndex(
                (e) => e.class_name == s.split("-")[0]
              );
            (r[a].parameters = {
              ...e.metafeatures.parameters.instances[a].parameters,
              [s.split("-")[1]]: t,
            }),
              e.set_metafeatures((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    metafeatures: {
                      ...s[e.idx].config.metafeatures,
                      parameters: {
                        ...s[e.idx].config.metafeatures.parameters,
                        instances: r,
                      },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsxs)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: [
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "metafeatures",
                    title: "global",
                    parameters: e.metafeatures.parameters.global,
                    set_parameters: (s, t) => {
                      e.set_metafeatures((r) => [
                        ...r.slice(0, e.idx),
                        {
                          ...r[e.idx],
                          config: {
                            ...r[e.idx].config,
                            metafeatures: {
                              ...r[e.idx].config.metafeatures,
                              parameters: {
                                ...r[e.idx].config.metafeatures.parameters,
                                global: {
                                  ...r[e.idx].config.metafeatures.parameters
                                    .global,
                                  [s.split("-")[1]]: t,
                                },
                              },
                            },
                          },
                        },
                        ...r.slice(e.idx + 1),
                      ]);
                    },
                    checkbox: !1,
                    set_list: e.set_list,
                  },
                  "global"
                ),
                e.metafeatures.parameters.instances.map((t) =>
                  (0, r.jsx)(
                    w,
                    {
                      idx: e.idx,
                      father: "metafeatures",
                      title: t.class_name,
                      parameters: t.parameters,
                      set_parameters: s,
                      checkbox: !0,
                      set_list: e.set_list,
                    },
                    t.class_name
                  )
                ),
              ],
            }),
          });
        },
        D = function (e) {
          let s = (s, t) => {
            let r = e.recommenders.parameters.instances,
              a = e.recommenders.parameters.instances.findIndex(
                (e) => e.class_name == s.split("-")[0]
              );
            (r[a].parameters = {
              ...e.recommenders.parameters.instances[a].parameters,
              [s.split("-")[1]]: t,
            }),
              e.set_recommenders((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    recommenders: {
                      ...s[e.idx].config.recommenders,
                      parameters: {
                        ...s[e.idx].config.recommenders.parameters,
                        instances: r,
                      },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsxs)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: [
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "recommenders",
                    title: "number_of_recommendations",
                    parameters: {
                      number_of_recommendations:
                        e.recommenders.parameters.number_of_recommendations,
                    },
                    set_parameters: (s, t) => {
                      e.set_recommenders((s) => [
                        ...s.slice(0, e.idx),
                        {
                          ...s[e.idx],
                          config: {
                            ...s[e.idx].config,
                            recommenders: {
                              ...s[e.idx].config.recommenders,
                              parameters: {
                                ...s[e.idx].config.recommenders.parameters,
                                number_of_recommendations: t,
                              },
                            },
                          },
                        },
                        ...s.slice(e.idx + 1),
                      ]);
                    },
                    checkbox: !1,
                    set_list: e.set_list,
                  },
                  "number_of_recommendations"
                ),
                e.recommenders.parameters.instances.map((t) =>
                  (0, r.jsx)(
                    w,
                    {
                      idx: e.idx,
                      father: "recommenders",
                      title: t.class_name,
                      parameters: t.parameters,
                      set_parameters: s,
                      checkbox: !0,
                      set_list: e.set_list,
                    },
                    t.class_name
                  )
                ),
              ],
            }),
          });
        },
        U = function (e) {
          let s = (s, t) => {
            let r = e.results.parameters.instances,
              a = e.results.parameters.instances.findIndex(
                (e) => e.class_name == s.split("-")[0]
              );
            (r[a].parameters = {
              ...e.results.parameters.instances[a].parameters,
              [s.split("-")[1]]: t,
            }),
              e.set_results((s) => [
                ...s.slice(0, e.idx),
                {
                  ...s[e.idx],
                  config: {
                    ...s[e.idx].config,
                    results: {
                      ...s[e.idx].config.results,
                      parameters: { instances: r },
                    },
                  },
                },
                ...s.slice(e.idx + 1),
              ]);
          };
          return (0, r.jsx)("div", {
            style: { display: "flex", alignItems: "center", width: "100%" },
            children: (0, r.jsx)(f.Z, {
              style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-evenly",
              },
              children: e.results.parameters.instances.map((t) =>
                (0, r.jsx)(
                  w,
                  {
                    idx: e.idx,
                    father: "results",
                    title: t.class_name,
                    parameters: t.parameters,
                    set_parameters: s,
                    checkbox: !0,
                    set_list: e.set_list,
                  },
                  t.class_name
                )
              ),
            }),
          });
        },
        F = t(9714),
        R = t(4495),
        O = t(1499),
        T = (e) => {
          let {
              title: s,
              component: t,
              header: i = !1,
              experiment: n = !1,
              set_experiment: c = () => {},
              set_dependencies: l = () => {},
            } = e,
            [m, o] = (0, a.useState)(!0),
            [d, p] = (0, a.useState)({
              database: [],
              preprocessing: [],
              metafeatures: [],
              metrics: [],
              hybrid: [],
              algorithms: [],
              results: [],
              folds: [],
            });
          return (0, r.jsxs)("div", {
            style: {
              display: "Recipe Defaults" == s ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            },
            children: [
              (0, r.jsxs)("div", {
                style: {
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: i ? "#595959" : "#808080",
                },
                children: [
                  (0, r.jsx)(y.Z, {
                    variant: "h5",
                    children: "exp1" == s ? "Experiment" : s,
                  }),
                  (0, r.jsx)(F.Z, {
                    onClick: () => {
                      o(!m);
                    },
                    children: (0, r.jsx)(O.Z, {}),
                  }),
                ],
              }),
              (0, r.jsx)(R.Z, {
                in: !m,
                style: { width: "100%" },
                children: t,
              }),
            ],
          });
        },
        E = function (e) {
          return (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)(T, {
                title: "Dataset",
                component: (0, r.jsx)(_, {
                  idx: e.idx,
                  dataset: e.experiment.dataset,
                  set_dataset: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "PreProcessing",
                component: (0, r.jsx)(S, {
                  idx: e.idx,
                  preprocessing: e.experiment.preprocessing,
                  set_preprocessing: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "Hybrid",
                component: (0, r.jsx)(I, {
                  idx: e.idx,
                  hybrid: e.experiment.hybrid,
                  set_hybrid: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "Metrics",
                component: (0, r.jsx)(z, {
                  idx: e.idx,
                  metrics: e.experiment.metrics,
                  set_metrics: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "Metafeatures",
                component: (0, r.jsx)(P, {
                  idx: e.idx,
                  metafeatures: e.experiment.metafeatures,
                  set_metafeatures: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "Recommenders",
                component: (0, r.jsx)(D, {
                  idx: e.idx,
                  recommenders: e.experiment.recommenders,
                  set_recommenders: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "Visualization",
                component: (0, r.jsx)(Z, {
                  idx: e.idx,
                  visualization: e.experiment.visualization,
                  set_visualization: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
              (0, r.jsx)(T, {
                title: "Results",
                component: (0, r.jsx)(U, {
                  idx: e.idx,
                  results: e.experiment.results,
                  set_results: e.set_experiment,
                  set_list: e.set_experiment,
                }),
              }),
            ],
          });
        },
        M = function () {
          let [e, s] = (0, a.useState)({}),
            [t, d] = (0, a.useState)(""),
            [p, u] = (0, a.useState)(""),
            [x, _] = (0, a.useState)({
              clusterName: "",
              projectID: "",
              clusterIp: "",
            }),
            [f, g] = (0, a.useState)([{ id: "Experiment 01", deps: [] }]),
            [h, b] = (0, a.useState)({
              database: [],
              preprocessing: [],
              metafeatures: [],
              metrics: [],
              hybrid: [],
              recommenders: [],
              results: [],
              visualization: [],
            }),
            [y, v] = (0, a.useState)([
              {
                config: {
                  experiment_id: "Recipe Defaults",
                  dataset: {
                    class: "GeneralDataset",
                    module: "src.data.general_dataset",
                    parameters: { name: "MovieLens" },
                  },
                  preprocessing: {
                    module: "src.preprocessing.preprocessing_container",
                    class: "PreProcessingContainer",
                    parameters: {
                      instances: [
                        {
                          module: "src.preprocessing.split",
                          class_name: "SplitProcessing",
                          parameters: {
                            target: "rating",
                            train_size: 70,
                            test_size: 30,
                            random_state: 42,
                            shuffle: !0,
                            stratify: "",
                          },
                        },
                        {
                          module: "src.preprocessing.folds",
                          class_name: "FoldsProcessing",
                          parameters: {
                            target_column: "rating",
                            folds: 1,
                            shuffle: !1,
                            random_state: 42,
                            strategy: "stratifiedshufflesplit",
                          },
                        },
                        {
                          module: "src.preprocessing.text",
                          class_name: "TextProcessing",
                          parameters: {
                            column_to_apply: "genres",
                            remove_stop_words: !0,
                            tokenize_words: !0,
                            column_to_index: "title",
                          },
                        },
                      ],
                    },
                  },
                  hybrid: {
                    class: "HybridContainer",
                    module: "src.hybrid.hybrid_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.hybrid.flws",
                          class_name: "Flws",
                          parameters: {},
                        },
                        {
                          module: "src.hybrid.stream",
                          class_name: "Stream",
                          parameters: {},
                        },
                      ],
                    },
                  },
                  metrics: {
                    class: "MetricsContainer",
                    module: "src.metrics.metrics_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.metrics.rmse",
                          class_name: "RMSE",
                          parameters: {
                            sample_weight: "None",
                            squared: !0,
                            missing: "error",
                          },
                        },
                        {
                          module: "src.metrics.recall",
                          class_name: "Recall",
                          parameters: {
                            labels: "None",
                            average: "binary",
                            sample_weight: "None",
                            zero_division: "warn",
                          },
                        },
                        {
                          module: "src.metrics.mae",
                          class_name: "MAE",
                          parameters: { multioutput: "uniform_average" },
                        },
                        {
                          module: "src.metrics.ndcg",
                          class_name: "NDCG",
                          parameters: {
                            k: "None",
                            sample_weight: "None",
                            ignore_ties: !1,
                          },
                        },
                      ],
                    },
                  },
                  metafeatures: {
                    module: "src.metafeatures.metafeatures_container",
                    class: "MetaFeatureContainer",
                    parameters: {
                      global: {
                        doUser: !0,
                        doItem: !0,
                        doItemUser: !0,
                        basePath: "",
                        resourceFile: "",
                        partitionLength: 1,
                        outputFolder: "",
                        bufferSize: 1e3,
                        numThreads: 0,
                        useTextOutput: !0,
                      },
                      instances: [
                        {
                          module: "src.metafeatures.jaccard",
                          class_name: "Jaccard",
                          parameters: {
                            type: "content-based",
                            basePath: "",
                            doUser: !0,
                            doItem: !1,
                            doItemUser: !1,
                            numThreads: 0,
                            metricParameter: { id: "", value: "" },
                            fields: ["1", "2", "3"],
                            items: [],
                          },
                        },
                        {
                          module: "src.metafeatures.gini",
                          class_name: "Gini",
                          parameters: {
                            type: "collaborative",
                            basePath: "",
                            doUser: !0,
                            doItem: !1,
                            doItemUser: !1,
                            numThreads: 0,
                            metricParameter: {},
                            items: [
                              {
                                dataFile: "",
                                resourceFile: "",
                                outputFolder: "",
                              },
                            ],
                            fields: [],
                          },
                        },
                      ],
                    },
                  },
                  recommenders: {
                    class: "RecommendersContainer",
                    module: "src.recommenders.recommenders_container",
                    parameters: {
                      number_of_recommendations: 10,
                      instances: [
                        {
                          module: "src.recommenders.item_knn",
                          class_name: "ItemKNN",
                          parameters: {
                            maxNumberNeighbors: 20,
                            minNumberNeighbors: 4,
                            saveNeighbors: 6,
                            feedback: "implicit",
                            aggregate: "weighted-average",
                            use_ratings: !0,
                          },
                        },
                        {
                          module: "src.recommenders.user_knn",
                          class_name: "UserKNN",
                          parameters: {
                            maxNumberNeighbors: 12,
                            minNumberNeighbors: 4,
                            min_sim: 0.3,
                            feedback: "implicit",
                            aggregate: "weighted-average",
                            use_ratings: !0,
                          },
                        },
                        {
                          module: "src.recommenders.pop_score",
                          class_name: "PopScore",
                          parameters: { score_method: "quantile" },
                        },
                        {
                          module: "src.recommenders.biasedSVD",
                          class_name: "BiasedSVD",
                          parameters: {
                            damping: 5,
                            iterations: 20,
                            features: 10,
                            bias: !0,
                          },
                        },
                        {
                          module: "src.recommenders.scikit_svd",
                          class_name: "ScikitSVD",
                          parameters: { features: 20, damping: 5 },
                        },
                        {
                          module: "src.recommenders.implicit_mf",
                          class_name: "ImplicitMF",
                          parameters: { features: 20, iterations: 20 },
                        },
                        {
                          module: "src.recommenders.content_based_recommender",
                          class_name: "ContentBasedRecommender",
                          parameters: { feature: "title", count_items: 15 },
                        },
                      ],
                    },
                  },
                  visualization: {
                    class: "VisualizationContainer",
                    module: "src.visualization.visualization_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.visualization.static_scatter",
                          class_name: "StaticScatter",
                          parameters: {
                            plot_types: {
                              ratings_by_user: !0,
                              ratings_by_items: !0,
                              items_predict: !0,
                              item_ratings_distribution: !0,
                            },
                          },
                        },
                        {
                          module: "src.visualization.static_bar",
                          class_name: "StaticBar",
                          parameters: {
                            plot_types: {
                              ratings_by_user: !0,
                              ratings_by_items: !0,
                              items_predict: !0,
                              item_ratings_distribution: !0,
                            },
                          },
                        },
                        {
                          module: "src.visualization.interactive_bar",
                          class_name: "InteractiveBar",
                          parameters: {
                            plot_types: {
                              ratings_by_user: !0,
                              ratings_by_items: !0,
                              items_predict: !0,
                              item_ratings_distribution: !0,
                            },
                          },
                        },
                      ],
                    },
                  },
                  results: {
                    class: "ResultsContainer",
                    module: "src.results.results_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.results.anova",
                          class_name: "ANOVA",
                          parameters: {
                            axis: 0,
                            models: "",
                            scale: "None",
                            test: "",
                            typ: "1",
                            robust: "",
                          },
                        },
                        {
                          module: "src.results.confidence_interval",
                          class_name: "ConfidenceInterval",
                          parameters: {
                            type: "norm",
                            alpha: 0.9,
                            loc: "mean",
                            scale: "",
                            sigma: "",
                          },
                        },
                      ],
                    },
                  },
                },
                checkeds: h,
              },
              {
                config: {
                  experiment_id: "exp1",
                  dataset: {
                    class: "GeneralDataset",
                    module: "src.data.general_dataset",
                    parameters: { name: "MovieLens" },
                  },
                  preprocessing: {
                    module: "src.preprocessing.preprocessing_container",
                    class: "PreProcessingContainer",
                    parameters: {
                      instances: [
                        {
                          module: "src.preprocessing.split",
                          class_name: "SplitProcessing",
                          parameters: {
                            target: "rating",
                            train_size: 70,
                            test_size: 30,
                            random_state: 42,
                            shuffle: !0,
                            stratify: "",
                          },
                        },
                        {
                          module: "src.preprocessing.folds",
                          class_name: "FoldsProcessing",
                          parameters: {
                            target_column: "rating",
                            folds: 1,
                            shuffle: !1,
                            random_state: 42,
                            strategy: "stratifiedshufflesplit",
                          },
                        },
                        {
                          module: "src.preprocessing.text",
                          class_name: "TextProcessing",
                          parameters: {
                            column_to_apply: "genres",
                            remove_stop_words: !0,
                            tokenize_words: !0,
                            column_to_index: "title",
                          },
                        },
                      ],
                    },
                  },
                  hybrid: {
                    class: "HybridContainer",
                    module: "src.hybrid.hybrid_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.hybrid.flws",
                          class_name: "Flws",
                          parameters: {},
                        },
                        {
                          module: "src.hybrid.stream",
                          class_name: "Stream",
                          parameters: {},
                        },
                      ],
                    },
                  },
                  metrics: {
                    class: "MetricsContainer",
                    module: "src.metrics.metrics_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.metrics.rmse",
                          class_name: "RMSE",
                          parameters: {
                            sample_weight: "None",
                            squared: !0,
                            missing: "error",
                          },
                        },
                        {
                          module: "src.metrics.recall",
                          class_name: "Recall",
                          parameters: {
                            labels: "None",
                            average: "binary",
                            sample_weight: "None",
                            zero_division: "warn",
                          },
                        },
                        {
                          module: "src.metrics.mae",
                          class_name: "MAE",
                          parameters: { multioutput: "uniform_average" },
                        },
                        {
                          module: "src.metrics.ndcg",
                          class_name: "NDCG",
                          parameters: {
                            k: "None",
                            sample_weight: "None",
                            ignore_ties: !1,
                          },
                        },
                      ],
                    },
                  },
                  metafeatures: {
                    module: "src.metafeatures.metafeatures_container",
                    class: "MetaFeatureContainer",
                    parameters: {
                      global: {
                        doUser: !0,
                        doItem: !0,
                        doItemUser: !0,
                        basePath: "",
                        resourceFile: "",
                        partitionLength: 1,
                        outputFolder: "",
                        bufferSize: 1e3,
                        numThreads: 0,
                        useTextOutput: !0,
                      },
                      instances: [
                        {
                          module: "src.metafeatures.jaccard",
                          class_name: "Jaccard",
                          parameters: {
                            type: "content-based",
                            basePath: "",
                            doUser: !0,
                            doItem: !1,
                            doItemUser: !1,
                            numThreads: 0,
                            metricParameter: { id: "", value: "" },
                            fields: ["1", "2", "3"],
                            items: [],
                          },
                        },
                        {
                          module: "src.metafeatures.gini",
                          class_name: "Gini",
                          parameters: {
                            type: "collaborative",
                            basePath: "",
                            doUser: !0,
                            doItem: !1,
                            doItemUser: !1,
                            numThreads: 0,
                            metricParameter: {},
                            items: [
                              {
                                dataFile: "",
                                resourceFile: "",
                                outputFolder: "",
                              },
                            ],
                            fields: [],
                          },
                        },
                      ],
                    },
                  },
                  recommenders: {
                    class: "RecommendersContainer",
                    module: "src.recommenders.recommenders_container",
                    parameters: {
                      number_of_recommendations: 10,
                      instances: [
                        {
                          module: "src.recommenders.item_knn",
                          class_name: "ItemKNN",
                          parameters: {
                            maxNumberNeighbors: 20,
                            minNumberNeighbors: 4,
                            saveNeighbors: 6,
                            feedback: "implicit",
                            aggregate: "weighted-average",
                            use_ratings: !0,
                          },
                        },
                        {
                          module: "src.recommenders.user_knn",
                          class_name: "UserKNN",
                          parameters: {
                            maxNumberNeighbors: 12,
                            minNumberNeighbors: 4,
                            min_sim: 0.3,
                            feedback: "implicit",
                            aggregate: "weighted-average",
                            use_ratings: !0,
                          },
                        },
                        {
                          module: "src.recommenders.pop_score",
                          class_name: "PopScore",
                          parameters: { score_method: "quantile" },
                        },
                        {
                          module: "src.recommenders.biasedSVD",
                          class_name: "BiasedSVD",
                          parameters: {
                            damping: 5,
                            iterations: 20,
                            features: 10,
                            bias: !0,
                          },
                        },
                        {
                          module: "src.recommenders.scikit_svd",
                          class_name: "ScikitSVD",
                          parameters: { features: 20, damping: 5 },
                        },
                        {
                          module: "src.recommenders.implicit_mf",
                          class_name: "ImplicitMF",
                          parameters: { features: 20, iterations: 20 },
                        },
                        {
                          module: "src.recommenders.content_based_recommender",
                          class_name: "ContentBasedRecommender",
                          parameters: { feature: "title", count_items: 15 },
                        },
                      ],
                    },
                  },
                  visualization: {
                    class: "VisualizationContainer",
                    module: "src.visualization.visualization_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.visualization.static_scatter",
                          class_name: "StaticScatter",
                          parameters: {
                            plot_types: {
                              ratings_by_user: !0,
                              ratings_by_items: !0,
                              items_predict: !0,
                              item_ratings_distribution: !0,
                            },
                          },
                        },
                        {
                          module: "src.visualization.static_bar",
                          class_name: "StaticBar",
                          parameters: {
                            plot_types: {
                              ratings_by_user: !0,
                              ratings_by_items: !0,
                              items_predict: !0,
                              item_ratings_distribution: !0,
                            },
                          },
                        },
                        {
                          module: "src.visualization.interactive_bar",
                          class_name: "InteractiveBar",
                          parameters: {
                            plot_types: {
                              ratings_by_user: !0,
                              ratings_by_items: !0,
                              items_predict: !0,
                              item_ratings_distribution: !0,
                            },
                          },
                        },
                      ],
                    },
                  },
                  results: {
                    class: "ResultsContainer",
                    module: "src.results.results_container",
                    parameters: {
                      instances: [
                        {
                          module: "src.results.anova",
                          class_name: "ANOVA",
                          parameters: {
                            axis: 0,
                            models: "",
                            scale: "None",
                            test: "",
                            typ: "1",
                            robust: "",
                          },
                        },
                        {
                          module: "src.results.confidence_interval",
                          class_name: "ConfidenceInterval",
                          parameters: {
                            type: "norm",
                            alpha: 0.9,
                            loc: "mean",
                            scale: "",
                            sigma: "",
                          },
                        },
                      ],
                    },
                  },
                },
                checkeds: h,
              },
            ]),
            [j, k] = (0, a.useState)({
              cluster_info: x,
              experiment_dependencies: f,
              recipesDefault: h,
              experiments: [],
            }),
            [C, N] = (0, a.useState)(!1),
            w = (e, s) => {
              let t = Object.keys(s).reduce((t, r) => {
                  var a, i;
                  let n = s[r],
                    c =
                      (null === (i = e[r]) || void 0 === i
                        ? void 0
                        : null === (a = i.parameters) || void 0 === a
                        ? void 0
                        : a.instances) || [],
                    l = c.filter((e) => n.includes(e.class_name));
                  return { ...t, [r]: l };
                }, {}),
                r = {
                  ...e,
                  preprocessing: {
                    ...e.preprocessing,
                    parameters: { instances: t.preprocessing },
                  },
                  hybrid: { ...e.hybrid, parameters: { instances: t.hybrid } },
                  metrics: {
                    ...e.metrics,
                    parameters: { instances: t.metrics },
                  },
                  metafeatures: {
                    ...e.metafeatures,
                    parameters: {
                      ...e.metafeatures.parameters,
                      instances: t.metafeatures,
                    },
                  },
                  recommenders: {
                    ...e.recommenders,
                    parameters: {
                      ...e.recommenders.parameters,
                      instances: t.recommenders,
                    },
                  },
                  visualization: {
                    ...e.visualization,
                    parameters: { instances: t.visualization },
                  },
                  results: {
                    ...e.results,
                    parameters: { instances: t.results },
                  },
                };
              return r;
            },
            S = () => {
              let e = {
                method: "post",
                maxBodyLength: 1 / 0,
                url: "http://localhost:5000/run",
                headers: { "Content-Type": "application/json" },
                responseType: "arraybuffer",
                data: j,
              };
              console.log(e),
                o.Z.request(e)
                  .then((e) => {
                    s(e.data), d("POST request successful");
                    let t = new Blob([e.data], { type: "application/zip" }),
                      r = document.createElement("a");
                    (r.href = window.URL.createObjectURL(t)),
                      (r.download = "downloaded-file.zip"),
                      document.body.appendChild(r),
                      r.click(),
                      document.body.removeChild(r);
                  })
                  .catch((e) => {
                    u("Error in POST request: " + e.message);
                  }),
                N(!1);
            };
          return (0, r.jsxs)(r.Fragment, {
            children: [
              y.map((e, s) =>
                s != y.length - 1
                  ? (0, r.jsx)(
                      T,
                      {
                        header: !0,
                        title: e.config.experiment_id,
                        component: (0, r.jsx)(E, {
                          idx: s,
                          experiment: e.config,
                          set_experiment: v,
                        }),
                      },
                      s
                    )
                  : (0, r.jsx)(
                      T,
                      {
                        header: !0,
                        experiment: !0,
                        set_experiment: v,
                        set_dependencies: g,
                        title: e.config.experiment_id,
                        component: (0, r.jsx)(E, {
                          idx: s,
                          experiment: e.config,
                          set_experiment: v,
                        }),
                      },
                      s
                    )
              ),
              (0, r.jsx)(i.Z, {
                variant: "contained",
                style: { backgroundColor: "#212529" },
                onClick: () => {
                  let e = y
                    .map((e, s) => {
                      if (0 != s) return w(e.config, e.checkeds);
                    })
                    .slice(1);
                  e &&
                    e.map((e, s) => {
                      Object.entries(y[0].checkeds).map((s) => {
                        let [t, r] = s;
                        "dataset" != t &&
                          r.map((s) => {
                            e &&
                              !e[t].parameters.instances.find(
                                (e) => e.class_name == s
                              ) &&
                              e[t].parameters.instances.push(
                                y[0].config[t].parameters.instances.filter(
                                  (e) => e.class_name == s
                                )
                              );
                          });
                      });
                    }),
                    k({
                      cluster_info: x,
                      experiment_dependencies: f,
                      recipesDefault: y[0].checkeds,
                      experiments: e || [],
                    }),
                    N(!0);
                },
                children: "Run!",
              }),
              (0, r.jsxs)(n.Z, {
                open: C,
                onClose: S,
                children: [
                  (0, r.jsx)(c.Z, { children: "Config File" }),
                  (0, r.jsx)(l.Z, {
                    children: (0, r.jsx)("pre", {
                      children: JSON.stringify(j.experiments, null, 2),
                    }),
                  }),
                  (0, r.jsx)(m.Z, {
                    children: (0, r.jsx)(i.Z, {
                      onClick: S,
                      color: "primary",
                      children: "OK",
                    }),
                  }),
                ],
              }),
              (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("p", { children: t }),
                  (0, r.jsx)("p", { children: p }),
                ],
              }),
            ],
          });
        },
        V = function () {
          return (0, r.jsxs)("div", {
            className: "main-container",
            children: [
              (0, r.jsx)("div", {
                className: "header",
                children: (0, r.jsx)("h1", { children: "RecSysExp" }),
              }),
              (0, r.jsx)("div", {
                className: "configs",
                children: (0, r.jsx)(M, {}),
              }),
            ],
          });
        };
      function q() {
        return (0, r.jsx)(V, {});
      }
    },
    5570: function () {},
  },
  function (e) {
    e.O(0, [800, 253, 698, 744], function () {
      return e((e.s = 3674));
    }),
      (_N_E = e.O());
  },
]);
