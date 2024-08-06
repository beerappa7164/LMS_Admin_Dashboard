const BaseRepository=require('./base.repository');
const InstructorLog=require('../model/instructorlog.model');

class InstructorLogRepository extends BaseRepository{
    constructor()
    {
        super(InstructorLog)
    }
   
};

module.exports=InstructorLogRepository;