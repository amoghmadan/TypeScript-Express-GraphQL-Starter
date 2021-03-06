import { PersonModel } from "../../models";
import { Person } from "../../interfaces/models";

const query: any = {
    hello: async (): Promise<string> => {
        return "World!";
    },
    people: async (): Promise<Person[]> => {
        return await PersonModel.find();
    },
    person: async (args: any): Promise<Person | null> => {
        return await PersonModel.findOne({ _id: args.id });
    },
};

export default query;
