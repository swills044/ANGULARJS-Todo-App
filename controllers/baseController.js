var mongoose = require('mongoose');

module.exports = function(c){

	var Model = c.model;

	function getAll(req, res) {
		var query = Model.find();
		query.exec(function (err, models) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(200).json(models);
            }
        });
	}

	function getOne(req, res){
		var queryString = {
            _id: req.params._id
        }

		Model.findOne(queryString, function (err, model) {
            if (err)
                res.send(err);
            else {
                if (model)
                    res.json(model);
                else
                    res.status(404).json({
                        error: 'Not Found'
                    });
            }
        });
	}

	function putUpdate(req, res){
		var queryString = {
            _id: req.params._id
        }


		Model.findOne(queryString, function (err, data) {

            if (err)
                res.send(err);
            else {
                if (data) {
                    for (var field in req.body) {
                        data[field] = req.body[field];
                    }
                    /*if (!data.AuditInfo)
                        data.AuditInfo = {};
                    data.AuditInfo.EditedByUser = req.user._id;
                    data.AuditInfo.EditDate = new Date();*/
                    data.save(function (err) {
                        if (err)
                            res.status(500).send(err);
                        else {
                            res.status(200).json(data);
                        }
                    });
                } else
                    res.status(404).json({
                        error: 'Not Found'
                    });
            }
        });

	}

	function postNew(req,res){
		var data = new Model(req.body);
		
		
        data.CreatedById = req.user._id;
		
		data.save(function(err){
			if (err)
				res.status(500).send(err);
			else {
				res.json(data);

			}


		})
	}

	function deleteOne(req, res){
		var queryString = {
            _id: req.params._id
        }

		Model.findOneAndRemove(queryString, function (err, data) {
            if (err)
                res.status(500).send(err);
            else {
                if (data) {
                    res.status(200).json('Item Deleted');
                } else
                    res.status(404).json({
                        error: 'Not Found'
                    });
            }
        });
	}





	var controller = {
		get: getAll,
		getOneById: getOne,
		put: putUpdate,
		post: postNew,
		delete: deleteOne
	};

	return controller;


}