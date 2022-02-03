import React from "react";
import axios from "axios";

export default class ApiService {
    static ApiUrl = 'https://api.jamskills.tk/api';
    static AuthorizedUser = undefined;
    static AuthTokenCookie = 'authToken';
    static AuthEmailCookie = 'authEmail';
    static SaveData() {
        if (this.AuthorizedUser) {
            localStorage.setItem(this.AuthTokenCookie, this.AuthorizedUser.token);
            localStorage.setItem(this.AuthEmailCookie, this.AuthorizedUser.email);
        }
    }
    static GetData() {
        let token = localStorage.getItem(this.AuthTokenCookie);
        let email = localStorage.getItem(this.AuthEmailCookie);
        if (token && email) {
            return { token, email }
        }
        return undefined;
    }
    static RemoveData() {
        localStorage.removeItem(this.AuthTokenCookie);
        localStorage.removeItem(this.AuthEmailCookie);
        this.AuthorizedUser = undefined;
    }
    static async Authorize(data) {
        const response = await axios.post(`${this.ApiUrl}/testingusers/login`, data);
        return response;
    }
    static async Register(data) {
        const response = await axios.post(`${this.ApiUrl}/testingusers/registration`, data);
        return response;
    }
    static async GetQuizCollection() {
        const response = await axios.get(`${this.ApiUrl}/testingusers/setquizzes`, {
            headers: { 'Authorization': `Bearer ${this.AuthorizedUser.token}` }
        });
        return response;
    }
    static async GetQuiz(id) {
        const response = await axios.get(`${this.ApiUrl}/testingusers/setquizzes/${id}`, {
            headers: { 'Authorization': `Bearer ${this.AuthorizedUser.token}` }
        });
        return response;
    }
    static async SendHolAnswers(id, data) {
        const response = await axios.post(`${this.ApiUrl}/testingusers/setquizzes/${id}/hol/answers`, data, {
            headers: { 'Authorization': `Bearer ${this.AuthorizedUser.token}` }
        });
        return response;
    }
    static async SendUskAnswers(id, data) {
        const response = await axios.post(`${this.ApiUrl}/testingusers/setquizzes/${id}/usk/answers`, data, {
            headers: { 'Authorization': `Bearer ${this.AuthorizedUser.token}` }
        });
        return response;
    }
    static async SendGatbAnswers(id, data) {
        const response = await axios.post(`${this.ApiUrl}/testingusers/setquizzes/${id}/gatb_5/answers`, data, {
            headers: { 'Authorization': `Bearer ${this.AuthorizedUser.token}` }
        });
        return response;
    }
}