import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        background: "white",
        zIndex: 100,
        position: "absolute",
        width: "800px",
        height: "100px",
        padding: "20px"
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
        <div className={classes.container}>
            <Slider
                step={null}
                marks={marks}
                defaultValue={defaultYear}
                min={years[0]}
                max={years[years.length - 1]}
                onChange={(_ev, newValue) => {
                    updateLayer(newValue as number);
                }}
            />
        </div>
    )
}
