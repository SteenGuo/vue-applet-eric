import http from "./http";

export default {
  getDemo(params) {
    return http({
      url: `path`,
      method: "get",
      params
    });
  },
  postDemo(data) {
    return http({
      url: `/api/v1/common/secret`,
      method: "post",
      data
    });
  },
};
