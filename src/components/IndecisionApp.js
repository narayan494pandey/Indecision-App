import React from 'react';
import Addoption from './Addoption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';
class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => this.setState(() => ({ options: [] }));
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }))
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => (
            {
                options: prevState.options.filter((option) => optionToRemove !== option

                )
            }
        ));
    };
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        //alert(option);
        this.setState(() => ({
            selectedOption: option
        }));
    };
    handleAddOption = (option) => {
        if (!option) {
            return "Enter valid value to add option";
        } else if (this.state.options.indexOf(option) > -1) {

            return "This option is already taken";
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));


    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options: options }));
            }
        } catch (e) {
            //do nothing
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }

    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
        const title = 'Indecision APP';
        const subTitle = 'Put your life in Hand of computer!';

        return (
            <div>
                <div className="container">
                    <Header subTitle={subTitle} />
                    <Action hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <Addoption handleAddOption={this.handleAddOption} />

                    </div>

                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />


            </div>

        );
    }
};
export default IndecisionApp;