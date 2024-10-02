import argparse
import asyncio

import lights_test

async def testing(f_name:str):
    func = getattr(lights_test, f_name)
    await func()

def init_parser():
    parser = argparse.ArgumentParser(description="Run test requests")
    parser.add_argument("f_name", type=str, help="Enter name of function")
    args = parser.parse_args()

    return args

if __name__ == "__main__":
    args = init_parser()
    asyncio.run(testing(f_name=args.f_name))