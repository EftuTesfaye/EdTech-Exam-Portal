import { IMaterialResource } from "../models/materialResource.model";
import axios from "../api/axios";

export async function fetchMaterialResources(criteria: any) {
  let raw = await axios.post(`/material-resources/get`, criteria);
  let data = raw.data;
  return data as IMaterialResource[];
}

export async function createMaterialResources(material: any) {
  let formData = new FormData();
  formData.append("grade", material.grade);
  formData.append("chapter", material.chapter);
  formData.append("courseId", material.courseId);
  formData.append("pdfDocument", material.materialResource);

  let raw = await axios.post(`/material-resources`, formData);
  let data = raw.data;
  console.log(data);

  return data;
}

export async function updateMaterialResources(id: string, material: any) {
  let raw = await axios.put(`/material-resources/${id}`, material);
  let data = raw.data;
  return data as IMaterialResource;
}

export async function deleteMaterialResources(id: string) {
  let raw = await axios.delete(`/material-resources/${id}`);
  let data = raw.data;
  return data as IMaterialResource;
}
