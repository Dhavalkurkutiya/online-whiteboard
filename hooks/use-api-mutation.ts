import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {

    const [pending, setPending] = useState(false);
    const useApiMutation = useMutation(mutationFunction);

    const mutate = (payload: any) => {
        setPending(true);
        return useApiMutation(payload)
        .then(() => setPending(false))
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw error;
        });
    };
    return {
        mutate,
        pending,
    };
};