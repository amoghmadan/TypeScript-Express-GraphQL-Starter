import { PersonModel } from '../../models/person';
import { Person } from '../../interfaces/person';

const mutations = {
    createPerson: async (args: Person): Promise<Person | null> => {
        let newPerson: Person = new PersonModel(args);
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
