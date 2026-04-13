import { APIRequestContext, APIResponse } from '@playwright/test';

// ─── Interfaces ────
export interface ApiResponse<T = any> {
    status: number;
    body: T;
    ok: boolean;
}

export interface ProductsResponse {
    responseCode: number;
    products: Product[];
}

export interface Product {
    id: number;
    name: string;
    price: string;
    brand?: string;
    category?: {
        usertype: { usertype: string };
        category: string;
    };
}

export interface LoginResponse {
    responseCode: number;
    message: string;
}

// ─── API Helper Class ──────────────────────────────────────────────────────────

export class ApiHelper {

    private context: APIRequestContext;
    private baseURL: string;

   constructor(context: APIRequestContext, baseURL: string = 'https://automationexercise.com') {
    this.context = context;
    this.baseURL = baseURL;
}


    // ── Core HTTP Methods ──────────────────────────────────────────────────────

    async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await this.context.get(`${this.baseURL}${endpoint}`);
        return this.parseResponse<T>(response);
    }

    async post<T = any>(endpoint: string, formData?: Record<string, string>): Promise<ApiResponse<T>> {
    const response = await this.context.post(`${this.baseURL}${endpoint}`, 
        formData ? { form: formData } : undefined
    );
    return this.parseResponse<T>(response);
}

    async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
        const response = await this.context.delete(`${this.baseURL}${endpoint}`);
        return this.parseResponse<T>(response);
    }

    // ── Domain-Specific Methods ────────────────────────────────────────────────

    async getAllProducts(): Promise<ApiResponse<ProductsResponse>> {
        return this.get<ProductsResponse>('/api/productsList');
    }

    async postProductsList(): Promise<ApiResponse<LoginResponse>> {
        return this.post<LoginResponse>('/api/productsList');
    }

    async searchProduct(searchTerm: string): Promise<ApiResponse<ProductsResponse>> {
        return this.post<ProductsResponse>('/api/searchProduct', {
            search_product: searchTerm
        });
    }

    async verifyLogin(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        return this.post<LoginResponse>('/api/verifyLogin', { email, password });
    }

    async deleteVerifyLogin(): Promise<ApiResponse<LoginResponse>> {
        return this.delete<LoginResponse>('/api/verifyLogin');
    }

    // ── Cleanup ────────────────────────────────────────────────────────────────

    async dispose(): Promise<void> {
        await this.context.dispose();
    }

    // ── Private Helpers ────────────────────────────────────────────────────────

    private async parseResponse<T>(response: APIResponse): Promise<ApiResponse<T>> {
        const body = await response.json() as T;
        return {
            status: response.status(),
            body,
            ok: response.ok()
        };
    }
}