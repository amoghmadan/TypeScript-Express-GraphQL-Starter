import { PersonModel } from "../../models";
import { Person } from "../../interfaces/models";

const mutations: any = {
    createPerson: async (args: Person): Promise<Person | null> => {
        const newPerson: Person = new PersonModel(args);
        return await newPerson.save();
    },
    updatePerson: async (args: any): Promise<Person | null> => {
        return await PersonModel.findByIdAndUpdate({ _id: args.id }, args);
    },
    deletePerson: async (args: any): Promise<Person | null> => {
        return await PersonModel.findByIdAndDelete({ _id: args.id }, args);
    },
};

export default mutations;
