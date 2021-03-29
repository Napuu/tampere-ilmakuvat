import { ReactNode, useState } from "react";
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { Info as InfoIcon, Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles({
    container: {
        background: "white",
        zIndex: 100,
        position: "absolute",
        width: "calc(100% - 60px)",
        paddingLeft: "20px",
        paddingRight: "20px",
        margin: "10px",
        maxWidth: "500px",
        borderRadius: "2px"
    },
    infoIcon: {
        position: "absolute",
        top: "70px",
        left: "12px",
        zIndex: 100,
        backgroundColor: "black",
        borderRadius: "15px",
        margin: "-3px",
        "& path": {
            transform: "scale(1.3) translate(-3px, -3px)"
        }
    },
    infoBox: {
        position: "absolute",
        top: "88px",
        zIndex: 100,
        background: "white",
        paddingLeft: "20px",
        paddingRight: "20px",
        margin: "10px",
        maxWidth: "500px",
        borderRadius: "2px"
    },
    colorPrimary: {
        color: "white"
    }
})
interface Props {
    children: ReactNode;
}
export function Header({children}: Props) {
    const classes = useStyles();
    const [infoVisible, setInfoVisible] = useState(false);
    return (
        <>
            <Box className={classes.container}>
                {children}
            </Box>
            <IconButton onClick={() => {
                setInfoVisible(!infoVisible);
            }}>
                <InfoIcon color={"primary"} classes={{"colorPrimary": classes.colorPrimary}} className={classes.infoIcon} />
            </IconButton>
            {infoVisible &&
                <Box className={classes.infoBox}>
                    <IconButton style={{position: "absolute", right: "0px"}} onClick={() => {
                        setInfoVisible(false);
                    }}>
                        <CloseIcon />
                    </IconButton>
                    <h4>
                        Ilmakuvia Tampereelta vuosien varrelta
                    </h4>
                    <p>
                        Vuosien 1946-2011 kuvat on ladattu Tampereen sivuilta <a href="https://data.tampere.fi">data.tampere.fi</a> ja viimeisin, 2020, Maanmittauslaitokselta.<br/>
                        Saatavilla oleva ollut resoluutio vaihtelee vuoden mukaan.
                    </p>
                    <p style={{fontSize: "small"}}>Santeri Kääriäinen &lt;santeri.kaariainen@iki.fi&gt;</p>
                </Box>
            }
        </>
    )
}
