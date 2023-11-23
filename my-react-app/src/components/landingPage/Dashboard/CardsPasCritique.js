import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const CardsPasCritique = ({filteredList, card}) => {
    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Collapse in={open}>
                {filteredList.length > 0 &&
                    <div className="row">
                        <div className="col">
                            {card}
                        </div>
                        <div className="col" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <IconButton
                                aria-label="close"
                                color="info"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="info" />
                            </IconButton>
                        </div>
                    </div>
                }
            </Collapse>
        </div>
    )
}

export default CardsPasCritique
