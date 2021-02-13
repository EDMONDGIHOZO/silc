import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:3333/";
// const API_URL = "http://silc.nceingenieurs.com/";

class ActionsService {
  getGroups() {
    return axios.get(API_URL + `groupes`, { headers: authHeader() });
  }

  editGroup(gid, formData) {
    return axios.put(API_URL + `groupes/${gid}`, formData, {
      headers: authHeader(),
    });
  }
  updateUser(id, formData) {
    return axios.put(API_URL + `user/edit/${id}`, formData, {
      headers: authHeader(),
    });
  }

  saveUser(formData) {
    return axios.post(API_URL + `user/register`, formData, {
      headers: authHeader(),
    });
  }

  deleteGroup(gid) {
    return axios.delete(API_URL + `groupes/${gid}`, {
      headers: authHeader(),
    });
  }

  deleteParoisse(pid) {
    return axios.delete(API_URL + `paroisses/${pid}`, {
      headers: authHeader(),
    });
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

  getDiocese(id) {
    return axios.get(API_URL + `dioceses/${id}`, { headers: authHeader() });
  }

  editDiocese(id, newName) {
    return axios.put(API_URL + `dioceses/${id}`, newName, {
      headers: authHeader(),
    });
  }

  deleteDiocese(id) {
    return axios.delete(API_URL + `dioceses/${id}`, { headers: authHeader() });
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

  saveCredits(formData) {
    return axios.post(API_URL + `credits`, formData, {
      headers: authHeader(),
    });
  }

  SaveSolde(formData) {
    return axios.post(API_URL + `soldes`, formData, {
      headers: authHeader(),
    });
  }

  savePenalty(formData) {
    return axios.post(API_URL + `penality`, formData, {
      headers: authHeader(),
    });
  }

  saveEntraide(formData) {
    return axios.post(API_URL + `entraide`, formData, {
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

  getUsers() {
    return axios.get(API_URL + `user/all`, { headers: authHeader() });
  }

  getDioPar(diocese_id) {
    return axios.get(API_URL + `api/dio-pars/${diocese_id}`, {
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

  allParoisses() {
    return axios.get(API_URL + `paroisses`, {
      headers: authHeader(),
    });
  }

  getPar(id) {
    return axios.get(API_URL + `paroisses/${id}`, {
      headers: authHeader(),
    });
  }
  getSgroup(groupId) {
    return axios.get(API_URL + `sgroup/${groupId}`, {
      headers: authHeader(),
    });
  }
  getCollection(colid) {
    return axios.get(API_URL + `collections/${colid}`, {
      headers: authHeader(),
    });
  }
}

export default new ActionsService();
