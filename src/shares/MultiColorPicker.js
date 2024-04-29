import { Button } from "primereact/button";
import { ColorPicker } from "primereact/colorpicker";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useRef, useState } from "react"

export const MultiColorPicker = ({ onChange }) => {

    const [color, setColor] = useState("#000000");
    let [colors, setColors] = useState([]);

    const updateColor = useCallback(() => {
        if(color){
            setColors(prevColors => [...prevColors, `#${color}`]);
        }
    }, [color])

    const filterColor = (color) => {
        const updateColor = colors.filter(col => col !== color);
        setColors(updateColor);
    }

    const watchColors = useCallback(() => {
        if (colors) {
            onChange(colors);
        }
    }, [colors]);

    useEffect(() => {
        watchColors();
    }, [colors]);

    return (
        <div className="grid">
            <div className="col-12">
                <label className="text-black"> Color Setting </label>
            </div>

            <div className="col-12 md:col-3 lg:col-3">
                <div className="p-inputgroup flex-1">
                    <ColorPicker
                        className="multi-color-picker"
                        value={color}
                        onChange={(e) => {
                            setColor(e.value);
                        }}
                    />

                    <InputText
                        className="p-inputtext-sm text-black"
                        value={color}
                    />

                    <Button
                        className="p-button-danger"
                        icon="pi pi-check"
                        onClick={updateColor}
                    />
                </div>
            </div>

            <div className="col-12 md:col-9 lg:col-9">
                <div className="color-circle-wrapper">
                    {colors.length > 0 && colors.map((color, index) => {
                        return (
                            <div 
                                key={`color_circle_id_${index}`} 
                                className="color-circle cursor-pointer" 
                                style={{ backgroundColor: `${color}` }}
                                onClick={() => filterColor(color)}
                            >
                                <span className="pi pi-times"></span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >

    )
}