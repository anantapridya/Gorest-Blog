import { IPost, IComment, IUser } from "../type/type"

const baseURL = "https://gorest.co.in/public/v2";
const bearerToken =
    "b9eb7f722fe0d4874bf159ac9f8c3dc0827b12b7acdb8c8ecef9b9350d3fec67";

export const getAllPost = async (
    number_perpage: number,
    page: number,
    query: string
): Promise<IPost[]> => {
    try {
        const res: any = await fetch(
            `${baseURL}/posts?per_page=${number_perpage}&page=${page}&body=${query}`,
            {
                next: { revalidate: 0 },
            }
        );
        const totalPages = parseInt(res.headers.get("X-Pagination-Pages"))
        const responseData = await res.json()
        return [totalPages, responseData]
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const getAllComment = async (): Promise<IComment[]> => {
    try {
        const res = await fetch(`${baseURL}/comments`, {
            next: { revalidate: 0 },
        });
        return await res.json();
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const getAllUser = async (
    number_perpage: number,
    page: number,
    query: string
): Promise<IUser[]> => {
    try {
        const res: any = await fetch(
            `${baseURL}/users?per_page=${number_perpage}&page=${page}&name=${query}`,
            {
                next: { revalidate: 0 },
            }
        );
        const totalPages = parseInt(res.headers.get("X-Pagination-Pages"))
        const responseData = await res.json()
        return [totalPages, responseData]
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const getUserDetail = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}/users/${id}`, {
            next: { revalidate: 0 },
        });
        return await res.json();
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const getCommentByPostId = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}/posts/${id}/comments`, {
            next: { revalidate: 0 },
        });
        return await res.json();
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const postUser = async (
    name: string,
    email: string,
    gender: "male" | "female",
    status: "active" | "inactive"
) => {
    try {
        const data = {
            name: name,
            email: email,
            gender: gender,
            status: status,
        };
        const res = await fetch(`${baseURL}/users`, {
            method: "POST",
            next: { revalidate: 0 },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        });

        return await res.json();
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const res = await fetch(`${baseURL}/users/${id}`, {
            method: "DELETE",
            next: { revalidate: 0 },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
        });
        console.log(res)
        return res;
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};

export const editUser = async (
    id: number,
    name: string,
    email: string,
    gender: "male" | "female",
    status: "active" | "inactive"
) => {
    try {
        const data = {
            name: name,
            email: email,
            gender: gender,
            status: status,
        };
        const res = await fetch(`${baseURL}/users/${id}`, {
            method: "PUT",
            next: { revalidate: 0 },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.log("Error Message: ", error);
        throw error;
    }
};
