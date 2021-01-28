import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3333/";

class ActionsService {
  getGroups() {
    return axios.get(API_URL + `groupes`, { headers: authHeader() });
  }

  createGroup(formData) {
    return axios.post(API_URL + `groupes`, formData, { headers: authHeader() });
  }

  createDiocese(formData) {
    return axios.post(API_URL + `dioceses`, formData, {
      headers: authHeader(),
    });
  }
  getDioceses() {
    return axios.get(API_URL + `dioceses`, { headers: authHeader() });
  }

  getGroupes() {
    return axios.get(API_URL + `api/groupeAll`, { headers: authHeader() });
  }
  getRoles() {
    return axios.get(API_URL + `roles`, { headers: authHeader() });
  }

  createParoisse(formData) {
    return axios.post(API_URL + `paroisses`, formData, {
      headers: authHeader(),
    });
  }

  SaveCredits(formData) {
    return axios.post(API_URL + `credits`, formData, {
      headers: authHeader(),
    });
  }
  saveRebursement(formData) {
    return axios.post(API_URL + `rebursements`, formData, {
      headers: authHeader(),
    });
  }

  SaveRelations(formData) {
    return axios.post(API_URL + `relations`, formData, {
      headers: authHeader(),
    });
  }

  SaveEpargne(formData) {
    return axios.post(API_URL + `epargnes`, formData, {
      headers: authHeader(),
    });
  }

  createUser(formData) {
    return axios.post(API_URL + `user/register`, formData, {
      headers: authHeader(),
    });
  }

  SaveGenInfo(formData) {
    return axios.post(API_URL + `collections`, formData, {
      headers: authHeader(),
    });
  }

  getUserInfo() {
    return axios.get(API_URL + `user/me`, { headers: authHeader() });
  }

  getParoisses(diocese_id) {
    return axios.get(API_URL + `dioceses/${diocese_id}`, {
      headers: authHeader(),
    });
  }

  // dashboard
  getDpg() {
    return axios.get(API_URL + `api/diocese_paroisse_groupes`, {
      headers: authHeader(),
    });
  }

  getAec() {
    return axios.get(API_URL + `api/aec`, {
      headers: authHeader(),
    });
  }
}

export default new ActionsService();
