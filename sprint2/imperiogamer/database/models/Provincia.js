module.exports =(sequelize,dataType) => {
    const Provincia = sequelize.define("provincias",{

        provincia_nombre:{
            type: dataType.STRING
        }
        
    },{
        timestamps: false
    }
    )
    return Provincia
}
    
