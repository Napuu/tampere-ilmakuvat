import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        background: "white",
        zIndex: 100,
        position: "absolute",
        width: "calc(100% - 60px)",
        padding: "20px",
        margin: "10px",
        maxWidth: "500px",
        borderRadius: "2px"
    },
    markLabel: {
        borderRadius: "3px",
        padding: "1px",
        fontSize: "small"
    }
})

interface Props {
    years: number[];
    defaultYear: number;
    updateLayer: (year: number) => void;
}

export function YearSelector({updateLayer, defaultYear, years}: Props) {
    const classes = useStyles();
    const marks = years.map((a) => {
        return {
            value: a,
            label: a
        };
    });
    return (
        <Slider
            classes={{markLabel: classes.markLabel}}
            step={null}
            track={false}
            marks={marks}
            defaultValue={defaultYear}
            min={years[0]}
            max={years[years.length - 1]}
            onChange={(_ev, newValue) => {
                updateLayer(newValue as number);
            }}
        />
    )
}
