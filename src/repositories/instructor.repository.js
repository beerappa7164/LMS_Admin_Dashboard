const BaseRepository=require('./base.repository');
const instructor=require('../model/instructor.model');

class InstructorRepository extends BaseRepository{
    constructor()
    {
        super(instructor)
    }
   
};

module.exports=InstructorRepository;