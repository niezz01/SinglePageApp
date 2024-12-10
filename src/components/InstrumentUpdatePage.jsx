import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function InstrumentUpdatePage() {

    
    const navigate = useNavigate();
    const param = useParams();
    const id = param.hangszerId;
    const [instrument, setInstrument] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        fetch(`https://kodbazis.hu/api/instruments/${id}`, { credentials: "include" })
            .then((res) => res.json())
            .then(setInstrument)
            .catch(console.log)
            .finally(() => {
                setPending(false);

            });

    }, [])

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Hangszer módosítása</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    fetch("https://kodbazis.hu/api/instruments/" + id, {
                        method: "PUT",
                        credentials: "include",
                        body: JSON.stringify({
                            name: e.target.elements.name.value,
                            price: e.target.elements.price.value,
                            quantity: e.target.elements.quantity.value,
                            imageURL: e.target.elements.imageURL.value,
                        }),
                    })
                        .then(() => {
                            navigate("/");
                        })
                        .catch(console.log);
                }}
            >
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={instrument.name} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div className="col-sm-9">
                        <input type="number" name="price" className="form-control" defaultValue={instrument.price} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Darabszám:</label>
                    <div className="col-sm-9">
                        <input type="number" name="quantity" className="form-control" defaultValue={instrument.quantity} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL:</label>
                    <div className="col-sm-9">
                        <input type="text" name="imageURL" className="form-control" defaultValue={instrument.imageURL} />
                    </div>
                </div>

                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div>
    );
}