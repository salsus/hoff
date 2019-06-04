function () {
// used in conjunction with "JS - Retain or Create Tracking Code" tag. can be set as custom dimension, ecommerce transaction parameter, etc.
 if({{ea.tracking.id cookie}}) { return {{ea.tracking.id cookie}}; }
 else if ({{ea.tracking.id url}}) {	return {{ea.tracking.id url}} ;}
 else return; 
}
